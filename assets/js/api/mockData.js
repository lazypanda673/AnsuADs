// Mock Data API with localStorage persistence

const CAMPAIGNS_KEY = 'ansuads_campaigns';

let mockCampaigns = [];

// Load campaigns from localStorage or seed data
export async function loadMockData() {
    // First, try to load from localStorage
    const storedData = localStorage.getItem(CAMPAIGNS_KEY);
    
    if (storedData) {
        try {
            mockCampaigns = JSON.parse(storedData);
            console.log('✅ Loaded', mockCampaigns.length, 'campaigns from localStorage');
            return { campaigns: mockCampaigns };
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }
    
    // If no localStorage data, load from seed.json
    // Detect if we're in a subdirectory (GitHub Pages) or running locally
    const basePath = window.location.pathname.includes('/AnsuADs/') ? '/AnsuADs' : '';
    const relativePath = './data/seed.json'; // Relative to index.html
    const absolutePath = `${basePath}/data/seed.json`; // Absolute path for GitHub Pages
    
    // Try relative path first (for local development), then absolute path
    const pathsToTry = basePath ? [absolutePath, relativePath] : [relativePath, absolutePath];
    
    for (const path of pathsToTry) {
        try {
            console.log('Attempting to load initial data from:', path);
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            mockCampaigns = data.campaigns || [];
            
            // Save to localStorage for future use
            saveCampaigns();
            
            console.log('✅ Successfully loaded', mockCampaigns.length, 'campaigns from', path);
            return data;
        } catch (error) {
            console.warn(`⚠️  Failed to load from ${path}:`, error.message);
            // Continue to next path
        }
    }
    
    // If all paths fail, use fallback data
    console.error('❌ Could not load seed.json from any path');
    console.warn('⚠️  Using fallback data. Make sure data/seed.json exists');
    mockCampaigns = [
        {
            id: 1,
            name: "Sample Campaign (Fallback)",
            objective: "Drive Sales",
            budget: 5000.00,
            start_date: "2025-06-01",
            end_date: "2025-08-31",
            status: "active",
            target_audience: "General audience",
            metrics: {
                impressions: 125000,
                clicks: 3500,
                ctr: 2.8,
                conversions: 280,
                cost: 3200.00
            },
            variants: []
        }
    ];
    saveCampaigns();
    return { campaigns: mockCampaigns };
}

// Save campaigns to localStorage
function saveCampaigns() {
    try {
        localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(mockCampaigns));
        console.log('💾 Saved campaigns to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Campaign API
export async function fetchCampaigns() {
    if (mockCampaigns.length === 0) {
        await loadMockData();
    }
    return [...mockCampaigns];
}

export async function fetchCampaign(id) {
    if (mockCampaigns.length === 0) {
        await loadMockData();
    }
    return mockCampaigns.find(c => c.id === parseInt(id));
}

export async function createCampaign(campaignData) {
    const newCampaign = {
        ...campaignData,
        id: Math.max(0, ...mockCampaigns.map(c => c.id)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        metrics: {
            impressions: 0,
            clicks: 0,
            ctr: 0,
            conversions: 0,
            cost: 0
        },
        variants: []
    };
    mockCampaigns.push(newCampaign);
    saveCampaigns(); // Persist to localStorage
    return newCampaign;
}

export async function updateCampaign(id, campaignData) {
    const index = mockCampaigns.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        throw new Error('Campaign not found');
    }
    
    mockCampaigns[index] = {
        ...mockCampaigns[index],
        ...campaignData,
        id: parseInt(id),
        updated_at: new Date().toISOString()
    };
    
    saveCampaigns(); // Persist to localStorage
    return mockCampaigns[index];
}

export async function deleteCampaign(id) {
    const index = mockCampaigns.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        throw new Error('Campaign not found');
    }
    
    mockCampaigns.splice(index, 1);
    saveCampaigns(); // Persist to localStorage
    return true;
}

// Variant API
export async function createVariant(campaignId, variantData) {
    const campaign = await fetchCampaign(campaignId);
    if (!campaign) {
        throw new Error('Campaign not found');
    }
    
    const newVariant = {
        ...variantData,
        id: Math.max(0, ...campaign.variants.map(v => v.id || 0)) + 1,
        created_at: new Date().toISOString()
    };
    
    campaign.variants.push(newVariant);
    await updateCampaign(campaignId, campaign);
    
    return newVariant;
}

export async function deleteVariant(campaignId, variantId) {
    const campaign = await fetchCampaign(campaignId);
    if (!campaign) {
        throw new Error('Campaign not found');
    }
    
    const index = campaign.variants.findIndex(v => v.id === parseInt(variantId));
    if (index === -1) {
        throw new Error('Variant not found');
    }
    
    campaign.variants.splice(index, 1);
    await updateCampaign(campaignId, campaign);
    
    return true;
}

// Stats API
export async function fetchStats() {
    if (mockCampaigns.length === 0) {
        await loadMockData();
    }
    
    return {
        totalCampaigns: mockCampaigns.length,
        activeCampaigns: mockCampaigns.filter(c => c.status === 'active').length,
        totalBudget: mockCampaigns.reduce((sum, c) => sum + (parseFloat(c.budget) || 0), 0),
        totalSpend: mockCampaigns.reduce((sum, c) => {
            const metrics = c.metrics || {};
            return sum + (parseFloat(metrics.cost) || 0);
        }, 0)
    };
}
