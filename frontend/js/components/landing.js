import { navigate } from '../main.js';

export function showLanding() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="landing-page">
            <nav class="landing-nav">
                <div class="container">
                    <div class="nav-content">
                        <div class="logo">
                            <span class="logo-icon">📊</span>
                            <span class="logo-text">AnsuADs</span>
                        </div>
                        <button class="btn btn-primary" id="getStartedNav">Get Started</button>
                    </div>
                </div>
            </nav>

            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1 class="hero-title">Manage Your Ad Campaigns with Confidence</h1>
                        <p class="hero-subtitle">
                            Streamline your advertising operations with powerful tools for campaign management, 
                            A/B testing, and performance tracking.
                        </p>
                        <div class="hero-actions">
                            <button class="btn btn-primary btn-lg" id="getStartedHero">Get Started</button>
                            <button class="btn btn-secondary btn-lg" id="learnMore">Learn More</button>
                        </div>
                    </div>
                    <div class="hero-image">
                        <div class="hero-graphic">
                            <div class="graphic-card card-1">
                                <div class="card-icon">📈</div>
                                <div class="card-text">Analytics</div>
                            </div>
                            <div class="graphic-card card-2">
                                <div class="card-icon">🎯</div>
                                <div class="card-text">Campaigns</div>
                            </div>
                            <div class="graphic-card card-3">
                                <div class="card-icon">🔄</div>
                                <div class="card-text">A/B Testing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="container">
                    <h2 class="section-title">Powerful Features for Modern Marketers</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🚀</div>
                            <h3 class="feature-title">Campaign Management</h3>
                            <p class="feature-description">
                                Create, edit, and monitor ad campaigns with an intuitive interface. 
                                Manage budgets, schedules, and objectives effortlessly.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔬</div>
                            <h3 class="feature-title">A/B Testing</h3>
                            <p class="feature-description">
                                Test multiple ad variants to find what works best. 
                                Compare performance metrics and optimize your campaigns.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📊</div>
                            <h3 class="feature-title">Real-time Analytics</h3>
                            <p class="feature-description">
                                Track impressions, clicks, conversions, and ROI in real-time. 
                                Make data-driven decisions with comprehensive metrics.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💰</div>
                            <h3 class="feature-title">Budget Control</h3>
                            <p class="feature-description">
                                Set daily and total budgets for your campaigns. 
                                Monitor spending and ensure you stay within limits.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🎨</div>
                            <h3 class="feature-title">Creative Management</h3>
                            <p class="feature-description">
                                Upload and manage ad creatives for different formats. 
                                Organize assets and variants in one place.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📱</div>
                            <h3 class="feature-title">Responsive Design</h3>
                            <p class="feature-description">
                                Manage campaigns from any device. 
                                Fully responsive interface works on desktop, tablet, and mobile.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="stats">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">Campaigns Managed</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">50M+</div>
                            <div class="stat-label">Impressions Delivered</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">95%</div>
                            <div class="stat-label">Client Satisfaction</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta">
                <div class="container">
                    <div class="cta-content">
                        <h2 class="cta-title">Ready to Transform Your Ad Management?</h2>
                        <p class="cta-subtitle">Join thousands of marketers who trust AnsuADs for their campaigns.</p>
                        <button class="btn btn-primary btn-lg" id="getStartedCta">Get Started Now</button>
                    </div>
                </div>
            </section>

            <footer class="landing-footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-logo">
                            <span class="logo-icon">📊</span>
                            <span class="logo-text">AnsuADs</span>
                        </div>
                        <p class="footer-text">© 2025 AnsuADs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    `;

    // Event listeners
    document.getElementById('getStartedNav')?.addEventListener('click', () => navigate('/login'));
    document.getElementById('getStartedHero')?.addEventListener('click', () => navigate('/login'));
    document.getElementById('getStartedCta')?.addEventListener('click', () => navigate('/login'));
    
    document.getElementById('learnMore')?.addEventListener('click', () => {
        document.querySelector('.features')?.scrollIntoView({ behavior: 'smooth' });
    });
}
