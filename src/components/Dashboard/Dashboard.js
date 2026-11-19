import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { state, actions } = useHealth();
    const [currentDashboard, setCurrentDashboard] = useState(type || 'worker');
    const [sidebarState, setSidebarState] = useState('compact');
    const [instantConsult, setInstantConsult] = useState(false);

    // Use sidebar state from context
    const sidebarOpen = state.sidebar.isOpen;

    useEffect(() => {
        if (type && ['worker', 'doctor', 'govt'].includes(type)) {
            setCurrentDashboard(type);
        }
    }, [type]);

    const switchDashboard = (dashboard) => {
        setCurrentDashboard(dashboard);
        navigate(`/dashboard/${dashboard}`);
        actions.toggleSidebar(false); // Close sidebar when switching
    };

    const toggleSidebar = () => {
        if (sidebarState === 'collapsed') {
            setSidebarState('compact');
        } else if (sidebarState === 'compact') {
            setSidebarState('expanded');
        } else {
            setSidebarState('collapsed');
        }
    };

    const toggleInstantConsult = () => {
        setInstantConsult(!instantConsult);
    };

    const renderProfile = () => {
        switch (currentDashboard) {
            case 'worker':
                return {
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
                    name: 'Arun Kumar',
                    subtitle: 'Health ID: HL-2300123',
                    role: 'Verified Worker',
                    showStatus: false
                };
            case 'doctor':
                return {
                    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face',
                    name: 'Dr. Ramneek W.',
                    subtitle: 'MBBS, Internal Medicine',
                    role: 'Sunrise Clinic',
                    showStatus: true
                };
            case 'govt':
                return {
                    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM3YzNhZWQiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Im0xMC4yOSAzLjg2TDEuODIgOS40MmE0LjI0IDQuMjQgMCAwIDAtMS43MyAzLjQzIDguMDcgOC4wNyAwIDAgMCAtLjU1IDMuNTVjLS4xNCAzLS4xNCA2IDE0IDZzMTQuMi0zIDEzLjk1LTZhOC4wNyA4LjA3IDAgMCAwLS41NS0zLjU1IDQuMjQgNC4yNCAwIDAgMC0xLjczLTMuNDNsLTguNDctNS41NmEyIDIgMCAwIDAtMi4xOCAwWiIvPgo8cGF0aCBkPSJNNCAxM2gxNiIvPgo8cGF0aCBkPSJtMTIgMy44NiA0LjggNC44VjEzIi8+CjxwYXRoIGQ9Im0xMS4yIDggNC44IDUuNiIvPgo8cGF0aCBkPSJtMTIuOCA4LTQuOCA1LjYiLz4KPC9zdmc+Cjwvc3ZnPgo=',
                    name: 'Admin Portal',
                    subtitle: 'Health Ministry',
                    role: 'Regional Administrator',
                    showStatus: false
                };
            default:
                return null;
        }
    };

    const renderNavigation = () => {
        switch (currentDashboard) {
            case 'worker':
                return (
                    <div>
                        <div className="nav-section-title">Worker</div>
                        <a href="#" className="nav-item active">
                            <i className="fas fa-file-medical nav-icon"></i>
                            <span className="nav-text">My Health Record</span>
                            <span className="nav-badge count">3</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-calendar-check nav-icon"></i>
                            <span className="nav-text">Appointments</span>
                            <span className="nav-badge count">1</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-qrcode nav-icon"></i>
                            <span className="nav-text">Health ID Card</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-comments nav-icon"></i>
                            <span className="nav-text">Chat with Doctor</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-syringe nav-icon"></i>
                            <span className="nav-text">Vaccination Status</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-cog nav-icon"></i>
                            <span className="nav-text">Settings</span>
                        </a>
                    </div>
                );
            case 'doctor':
                return (
                    <div>
                        <div className="nav-section-title">Doctor</div>
                        <a href="#" className="nav-item active">
                            <i className="fas fa-rupee-sign nav-icon"></i>
                            <span className="nav-text">Payments</span>
                            <span className="nav-badge count">6</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-qrcode nav-icon"></i>
                            <span className="nav-text">Health ID / QR</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-chart-bar nav-icon"></i>
                            <span className="nav-text">Clinic Dashboard</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-syringe nav-icon"></i>
                            <span className="nav-text">Vaccination Program</span>
                            <span className="nav-badge new">NEW</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-file-alt nav-icon"></i>
                            <span className="nav-text">Templates</span>
                            <span className="nav-badge new">NEW</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-handshake nav-icon"></i>
                            <span className="nav-text">Share Bajaj offer</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-cog nav-icon"></i>
                            <span className="nav-text">Settings</span>
                        </a>
                        
                        <div className="nav-section-title" style={{marginTop: '20px'}}>Patients</div>
                        <a href="#" className="nav-item">
                            <i className="fas fa-users nav-icon"></i>
                            <span className="nav-text">Worker list</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-question-circle nav-icon"></i>
                            <span className="nav-text">Queries</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-comments nav-icon"></i>
                            <span className="nav-text">My chats</span>
                        </a>
                        
                        <div className="nav-section-title" style={{marginTop: '20px'}}>Help and support</div>
                        <a href="#" className="nav-item">
                            <i className="fas fa-question-circle nav-icon"></i>
                            <span className="nav-text">Help Center</span>
                        </a>
                    </div>
                );
            case 'govt':
                return (
                    <div>
                        <div className="nav-section-title">Administration</div>
                        <a href="#" className="nav-item active">
                            <i className="fas fa-map-marked-alt nav-icon"></i>
                            <span className="nav-text">Regional Health Overview</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-users nav-icon"></i>
                            <span className="nav-text">Migrant Worker Stats</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-chart-line nav-icon"></i>
                            <span className="nav-text">Disease Trends</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-file-download nav-icon"></i>
                            <span className="nav-text">Reports</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-user-shield nav-icon"></i>
                            <span className="nav-text">User Management</span>
                        </a>
                        <a href="#" className="nav-item">
                            <i className="fas fa-cog nav-icon"></i>
                            <span className="nav-text">Settings</span>
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderMainContent = () => {
        switch (currentDashboard) {
            case 'worker':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <h1 className="h2 fw-bold text-dark mb-2">Worker Profile</h1>
                                    <p className="text-muted">Manage your health records and appointments</p>
                                </div>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-label">Last Visit</div>
                                <div className="stat-value text-primary">03 Aug 2025</div>
                                <div className="stat-change text-muted">Fever - Paracetamol prescribed</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Blood Group</div>
                                <div className="stat-value text-danger">B+</div>
                                <div className="stat-change text-success">Verified</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Vaccination</div>
                                <div className="stat-value text-success">Complete</div>
                                <div className="stat-change text-muted">COVID-19, Hepatitis B</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="dashboard-card">
                                    <div className="card-header-custom">
                                        <h5 className="fw-semibold mb-0">Recent Medical Reports</h5>
                                    </div>
                                    <div className="card-body-custom">
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                                            <div>
                                                <h6 className="fw-semibold mb-1">Blood Test Report</h6>
                                                <small className="text-muted">Uploaded: 03 Aug 2025</small>
                                            </div>
                                            <button className="btn btn-sm btn-outline-primary">View</button>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                                            <div>
                                                <h6 className="fw-semibold mb-1">X-Ray Chest</h6>
                                                <small className="text-muted">Uploaded: 28 Jul 2025</small>
                                            </div>
                                            <button className="btn btn-sm btn-outline-primary">View</button>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                                            <div>
                                                <h6 className="fw-semibold mb-1">Prescription Record</h6>
                                                <small className="text-muted">Uploaded: 25 Jul 2025</small>
                                            </div>
                                            <button className="btn btn-sm btn-outline-primary">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'doctor':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <h1 className="h2 fw-bold text-dark mb-2">Doctor Dashboard</h1>
                                    <p className="text-muted">Manage patient records and consultations</p>
                                </div>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-label">Today's Patients</div>
                                <div className="stat-value text-primary">24</div>
                                <div className="stat-change positive">+3 from yesterday</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Pending Queries</div>
                                <div className="stat-value text-warning">8</div>
                                <div className="stat-change negative">2 urgent</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">This Month</div>
                                <div className="stat-value text-success">342</div>
                                <div className="stat-change text-muted">Total consultations</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Instant Consults</div>
                                <div className="stat-value text-info">ON</div>
                                <div className="stat-change text-muted">6 requests pending</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="dashboard-card">
                                    <div className="card-header-custom">
                                        <h5 className="fw-semibold mb-0">Recent Patient Records</h5>
                                    </div>
                                    <div className="card-body-custom">
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                                                     className="rounded-circle me-3" width="40" height="40" alt="Patient"/>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Arun Kumar</h6>
                                                    <small className="text-muted">M / 28 • B+ • Vaccinated</small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Last visit: 2025-08-03</small>
                                                <span className="badge bg-primary rounded-pill">Follow-up</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" 
                                                     className="rounded-circle me-3" width="40" height="40" alt="Patient"/>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Priya Sharma</h6>
                                                    <small className="text-muted">F / 24 • O+ • Vaccinated</small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Last visit: 2025-08-02</small>
                                                <span className="badge bg-success rounded-pill">New</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                                            <div className="d-flex align-items-center">
                                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                                                     className="rounded-circle me-3" width="40" height="40" alt="Patient"/>
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Rajesh Singh</h6>
                                                    <small className="text-muted">M / 35 • AB+ • Partial</small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Last visit: 2025-08-01</small>
                                                <span className="badge bg-danger rounded-pill">Urgent</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'govt':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-4">
                                    <h1 className="h2 fw-bold text-dark mb-2">Government/NGO Dashboard</h1>
                                    <p className="text-muted">Regional health monitoring and analytics</p>
                                </div>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-label">Total Workers</div>
                                <div className="stat-value text-primary">15,432</div>
                                <div className="stat-change positive">+234 this month</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Active Cases</div>
                                <div className="stat-value text-warning">1,247</div>
                                <div className="stat-change negative">342 require attention</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Vaccination Rate</div>
                                <div className="stat-value text-success">89%</div>
                                <div className="stat-change text-muted">COVID-19 completed</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Registered Clinics</div>
                                <div className="stat-value" style={{color: '#7c3aed'}}>156</div>
                                <div className="stat-change text-muted">Mumbai region</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="dashboard-card">
                                    <div className="card-header-custom">
                                        <h5 className="fw-semibold mb-0">Mumbai — Last 30 days</h5>
                                    </div>
                                    <div className="card-body-custom">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">Malaria cases</span>
                                            <span className="fw-semibold text-danger">200</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">Male affected</span>
                                            <span className="fw-semibold">45%</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="text-muted">Average age</span>
                                            <span className="fw-semibold">32 years</span>
                                        </div>
                                        <button className="btn btn-primary w-100">Export Report (PDF)</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="dashboard-card">
                                    <div className="card-header-custom">
                                        <h5 className="fw-semibold mb-0">Top 5 Diseases This Month</h5>
                                    </div>
                                    <div className="card-body-custom">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">1. Fever/Viral</span>
                                            <span className="fw-semibold text-warning">456 cases</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">2. Malaria</span>
                                            <span className="fw-semibold text-danger">234 cases</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">3. Dengue</span>
                                            <span className="fw-semibold text-warning">189 cases</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted">4. Flu</span>
                                            <span className="fw-semibold text-primary">120 cases</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted">5. Typhoid</span>
                                            <span className="fw-semibold text-danger">87 cases</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const profile = renderProfile();
    const sidebarClasses = `sidebar ${sidebarState === 'collapsed' ? 'sidebar-collapsed' : sidebarState === 'expanded' ? 'sidebar-expanded' : 'sidebar-compact'} ${sidebarOpen ? 'show' : ''} ${currentDashboard === 'govt' ? 'purple-theme' : ''}`;
    const mainContentClasses = `main-content ${sidebarState === 'collapsed' ? 'collapsed' : sidebarState === 'expanded' ? 'expanded' : ''}`;

    return (
        <div className="dashboard-container">
            <div className="hamburger-menu" onClick={() => actions.toggleSidebar()}>
                <i className="fas fa-bars"></i>
            </div>

            <div className={sidebarClasses}>
                <div className="nav-section">
                    <button 
                        className={`nav-item dashboard-option ${currentDashboard === 'worker' ? 'active' : ''}`}
                        onClick={() => switchDashboard('worker')}
                    >
                        <i className="fas fa-user nav-icon"></i>
                        <span className="nav-text">Worker Dashboard</span>
                    </button>
                    <button 
                        className={`nav-item dashboard-option ${currentDashboard === 'doctor' ? 'active' : ''}`}
                        onClick={() => switchDashboard('doctor')}
                    >
                        <i className="fas fa-user-md nav-icon"></i>
                        <span className="nav-text">Doctor Dashboard</span>
                    </button>
                    <button 
                        className={`nav-item dashboard-option ${currentDashboard === 'govt' ? 'active' : ''}`}
                        onClick={() => switchDashboard('govt')}
                    >
                        <i className="fas fa-shield-alt nav-icon"></i>
                        <span className="nav-text">Govt/NGO Dashboard</span>
                    </button>
                </div>
                
                <div className="expand-btn" onClick={toggleSidebar}>
                    <i className={`fas ${sidebarState === 'expanded' ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </div>
                
                {profile && (
                    <div className="profile-section">
                        <div className="profile-card">
                            <img src={profile.avatar} alt="Profile" className="profile-avatar" />
                            <div className="profile-info">
                                <h6>{profile.name}</h6>
                                <div className="subtitle">{profile.subtitle}</div>
                                <div className="role">{profile.role}</div>
                            </div>
                        </div>
                        <i className="fas fa-qrcode qr-icon"></i>
                    </div>
                )}

                {profile && profile.showStatus && (
                    <div className="status-section">
                        <div className="status-toggle">
                            <div className="status-info">
                                <div className={`status-dot ${!instantConsult ? 'inactive' : ''}`}></div>
                                <span>{instantConsult ? 'Available - Instant Consult ON' : 'Unavailable - Instant Consult OFF'}</span>
                            </div>
                            <div className={`toggle-switch ${instantConsult ? 'active' : ''}`} onClick={toggleInstantConsult}>
                                <div className="toggle-slider"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="nav-section">
                    {renderNavigation()}
                </div>
            </div>

            <div className={mainContentClasses} style={{marginLeft: sidebarOpen ? (sidebarState === 'expanded' ? 'var(--sidebar-width-expanded)' : sidebarState === 'collapsed' ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-compact)') : '0'}}>
                {renderMainContent()}
            </div>
        </div>
    );
};

export default Dashboard;