// Mock Data API

let mockCampaigns = [];

// Load initial data
export async function loadMockData() {
    // Get the base URL
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    const paths = [
        'data/seed.json',
        './data/seed.json',
        '/data/seed.json',
        baseUrl + 'data/seed.json'
    ];
    
    console.log('Base URL:', baseUrl);
    
    for (const path of paths) {
        try {
            console.log('Trying to load data from:', path);
            const response = await fetch(path);
            if (!response.ok) {
                console.log(`Failed to load from ${path}: ${response.status}`);
                continue;
            }
            const data = await response.json();
            mockCampaigns = data.campaigns || [];
            console.log('Successfully loaded campaigns:', mockCampaigns.length, 'from', path);
            return data;
        } catch (error) {
            console.log(`Error with path ${path}:`, error.message);
            continue;
        }
    }
    
    // If all paths fail, use fallback data
    console.warn('Could not load seed.json from any path, using fallback data');
    mockCampaigns = [
        {
            id: 1,
            name: "Sample Campaign",
            objective: "Drive Sales",
            budget: 5000.00,
            start_date: "2025-06-01",
            end_date: "2025-08-31",
            status: "active",
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
    return { campaigns: mockCampaigns };
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
        variants: []
    };
    mockCampaigns.push(newCampaign);
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
    
    return mockCampaigns[index];
}

export async function deleteCampaign(id) {
    const index = mockCampaigns.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
        throw new Error('Campaign not found');
    }
    
    mockCampaigns.splice(index, 1);
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
