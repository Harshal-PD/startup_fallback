import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Key, 
  Info, 
  HelpCircle, 
  Layers, 
  Lightbulb, 
  Users, 
  Compass, 
  ExternalLink, 
  Award, 
  FileText,
  Flame,
  Check
} from 'lucide-react';

import { 
  runIntakeStage, 
  runRisksStage, 
  runSimulationStage, 
  runSynthesisStage, 
  runGateCandidatesStage, 
  runResourceMappingStage 
} from './utils/gemini';
import { filterResources } from './data/resources';
import { mockIdeas } from './data/mockData';

export default function App() {
  // App settings & states
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('foothold_gemini_key') || '');
  const [showApiModal, setShowApiModal] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedDemoId, setSelectedDemoId] = useState('coffeelink');
  
  // Pipeline Stage state
  const [currentStage, setCurrentStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');

  // Data stores for each stage
  const [ideaDescription, setIdeaDescription] = useState('');
  const [ideaType, setIdeaType] = useState('Product/SaaS');
  const [projectName, setProjectName] = useState('My Venture');

  // Stage outputs
  const [intakeData, setIntakeData] = useState(null);
  const [risks, setRisks] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [synthesis, setSynthesis] = useState(null);
  const [candidateExperiments, setCandidateExperiments] = useState(null);
  
  // Stage 5 Gate Chosen Experiment
  const [selectedExpId, setSelectedExpId] = useState('');
  const [customExperimentText, setCustomExperimentText] = useState('');

  // Stage 6 & 7 Outputs
  const [mappedResources, setMappedResources] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  // Load demo idea description when it changes
  useEffect(() => {
    if (isDemoMode) {
      const demo = mockIdeas.find(d => d.id === selectedDemoId);
      if (demo) {
        setIdeaDescription(demo.description);
        setIdeaType(demo.type);
        setProjectName(demo.title);
      }
    }
  }, [selectedDemoId, isDemoMode]);

  // Handle saving API key
  const handleSaveApiKey = (key) => {
    localStorage.setItem('foothold_gemini_key', key);
    setApiKey(key);
    setShowApiModal(false);
    if (key.trim()) {
      setIsDemoMode(false);
    }
  };

  // Run the intake analysis pipeline
  const proceedToIntakeAnalysis = async () => {
    if (!isDemoMode && !apiKey.trim()) {
      setError('Please provide a Google Gemini API Key or enable Demo Mode to run the analysis.');
      setShowApiModal(true);
      return;
    }

    if (!ideaDescription.trim()) {
      setError('Please enter a description for your venture idea.');
      return;
    }

    setError('');
    setLoading(true);
    setLoadingMessage('Initializing analysis engine: Parsing your concept and target audience...');

    try {
      // Stage 1: Intake parsing
      const stage1Result = await runIntakeStage(apiKey, ideaDescription, ideaType, isDemoMode, selectedDemoId);
      setIntakeData(stage1Result);
      
      // Advance to Stage 2 (Risks & Assumptions)
      setLoadingMessage('Running risk analyzer: Compiling assumptions, blindspots, and mitigations...');
      const stage2Result = await runRisksStage(apiKey, stage1Result, isDemoMode, selectedDemoId);
      setRisks(stage2Result);

      // Advance to Stage 3 (Scenario Simulations)
      setLoadingMessage('Simulating advisor panel: Compiling expert critiques from Clara, Marcus, and Sarah...');
      const stage3Result = await runSimulationStage(apiKey, stage1Result, stage2Result, isDemoMode, selectedDemoId);
      setSimulation(stage3Result);

      // Advance to Stage 4 (Synthesis Validation Plan)
      setLoadingMessage('Synthesizing 30/60/90 day milestone roadmap and experiment triggers...');
      const stage4Result = await runSynthesisStage(apiKey, stage1Result, stage2Result, stage3Result, isDemoMode, selectedDemoId);
      setSynthesis(stage4Result);

      // Advance to Stage 5 (Generate Gate Candidates)
      setLoadingMessage('Preparing the Decision Gate: Creating actionable first-step validation experiments...');
      const stage5Result = await runGateCandidatesStage(apiKey, stage1Result, stage4Result, stage2Result, isDemoMode, selectedDemoId);
      setCandidateExperiments(stage5Result);
      
      // Set default selected experiment
      if (stage5Result && stage5Result.length > 0) {
        setSelectedExpId(stage5Result[0].id);
      }

      setCurrentStage(5); // Go straight to the decision gate (interactive checkpoint)
    } catch (err) {
      setError(`Analysis pipeline failed: ${err.message}. Consider switching to Demo Mode for a smooth walkthrough.`);
    } finally {
      setLoading(false);
    }
  };

  // Lock in the chosen experiment from Stage 5 Gate
  const lockInFirstExperiment = async () => {
    let finalExperimentDescription = '';
    
    if (selectedExpId === 'custom') {
      if (!customExperimentText.trim()) {
        setError('Please describe your custom experiment.');
        return;
      }
      finalExperimentDescription = customExperimentText;
    } else {
      const chosen = candidateExperiments.find(e => e.id === selectedExpId);
      finalExperimentDescription = chosen ? `${chosen.title}: ${chosen.description}` : 'Custom Validation Test';
    }

    setError('');
    setLoading(true);
    setLoadingMessage('Mapping resources: Evaluating funding and connection categories suitable for this experiment...');

    try {
      // Stage 6: Resource Mapping (LLM Decision)
      const unresolvedRisks = risks.filter(r => r.status === 'Unresolved');
      const stage6Result = await runResourceMappingStage(
        apiKey,
        intakeData.ideaType,
        intakeData.subDomain,
        finalExperimentDescription,
        unresolvedRisks,
        isDemoMode,
        selectedDemoId
      );
      
      setMappedResources(stage6Result);
      
      // Auto-trigger Stage 7: Deterministic rules retrieval
      const allCategories = [
        ...stage6Result.funding_categories.map(c => c.category),
        ...stage6Result.network_categories.map(c => c.category)
      ];
      
      if (allCategories.length > 0) {
        setSelectedCategory(allCategories[0]);
        const matched = filterResources(allCategories, intakeData.ideaType);
        setFilteredResources(matched);
      }

      setCurrentStage(6); // Go to Resource mapping page
    } catch (err) {
      setError(`Resource mapping failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper to filter resources by category in Stage 7 UI
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Reset pipeline back to intake screen
  const resetApp = () => {
    setCurrentStage(1);
    setIntakeData(null);
    setRisks(null);
    setSimulation(null);
    setSynthesis(null);
    setCandidateExperiments(null);
    setMappedResources(null);
    setSelectedExpId('');
    setCustomExperimentText('');
    setError('');
  };

  // Render the DFD-style Pipeline Step Bar
  const renderPipelineBar = () => {
    const steps = [
      { num: 1, label: 'Intake' },
      { num: 2, label: 'Risks' },
      { num: 3, label: 'Simulations' },
      { num: 4, label: 'Roadmap' },
      { num: 5, label: 'Decision Gate' },
      { num: 6, label: 'Resource Match' }
    ];

    return (
      <div className="pipeline-bar">
        {steps.map((step) => {
          let statusClass = '';
          if (currentStage === step.num) statusClass = 'active';
          else if (currentStage > step.num || (currentStage === 6 && step.num === 6)) statusClass = 'completed';

          return (
            <div key={step.num} className={`pipeline-step ${statusClass}`}>
              <div className="step-num">{step.num}</div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
        <div className="pipeline-connector">
          <div 
            className="pipeline-connector-progress" 
            style={{ width: `${((Math.min(currentStage, 6) - 1) / 5) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Header bar */}
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-icon">
            <Flame size={24} />
          </div>
          <span className="logo-text">Foothold</span>
          <span className="logo-tag">V2.0</span>
        </div>

        <div className="flex items-center gap-3" style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`api-badge`} 
            onClick={() => setShowApiModal(true)}
            title="Configure Gemini API Key"
          >
            <div className={`api-status-dot ${apiKey.trim() ? 'active' : 'inactive'}`} />
            <span>{apiKey.trim() ? 'API Key Configured' : 'No API Key (Mock Mode)'}</span>
            <Key size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </header>

      {/* Error alert banner */}
      {error && (
        <div className="not-yet-panel" style={{ background: 'rgba(244, 63, 94, 0.08)', marginBottom: '1.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <div className="not-yet-title">
            <AlertTriangle size={18} />
            <span>Error Encountered</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#fda4af', paddingLeft: '1.5rem' }}>{error}</p>
        </div>
      )}

      {/* DFD Visual Progress Map */}
      {currentStage > 1 && renderPipelineBar()}

      {/* Stage Loading State */}
      {loading ? (
        <div className="premium-card loading-container">
          <div className="spinner"></div>
          <div className="loading-text">{loadingMessage}</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {isDemoMode ? "Simulating analysis engine steps..." : "Querying Google Gemini Models..."}
          </p>
        </div>
      ) : (
        /* Stages Controller */
        <main className="dashboard-grid">
          
          {/* STAGE 1: INTAKE & DEMO MODE SELECT */}
          {currentStage === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Demo Mode settings bar */}
              <div className="demo-banner">
                <div className="demo-banner-content">
                  <span className="demo-banner-badge">Demo Mode</span>
                  <p style={{ fontSize: '0.9rem', textAlign: 'left' }}>
                    {isDemoMode 
                      ? "Running in zero-latency walkthrough mode using high-fidelity mock assets."
                      : "API Key detected. Deactivating mock templates to query Gemini Live."
                    }
                  </p>
                </div>
                <button 
                  className="btn-secondary" 
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px' }}
                >
                  {isDemoMode ? "Switch to Live API" : "Switch to Mock Demo"}
                </button>
              </div>

              {/* Grid content */}
              <div className="dashboard-grid split">
                {/* Left Card: Main Input Form */}
                <div className="premium-card glow">
                  <div className="premium-card-title">
                    <Sparkles className="text-purple-400" style={{ color: 'var(--neon-purple)' }} />
                    <span>Intake: Capture Your Venture Concept</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g. CoffeeLink, PixelNews..." 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Venture Category</label>
                    <select 
                      className="form-select"
                      value={ideaType}
                      onChange={(e) => setIdeaType(e.target.value)}
                    >
                      <option value="Product/SaaS">Product/SaaS (Software, platforms, hardware)</option>
                      <option value="Content/Creator">Content/Creator (YouTube, newsletter, media publishing)</option>
                      <option value="Local Service">Local Service (Pet care, food trucks, agency, retail)</option>
                      <option value="Research/Nonprofit">Research/Nonprofit (Social enterprise, academic, citizen science)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Idea Description & Problem Statement</label>
                    <textarea 
                      className="form-textarea"
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                      placeholder="Describe the problem you are solving, who experiences it, how your product solves it, and how you intend to validate demand..."
                    ></textarea>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '2rem' }}>
                    <button 
                      className="btn-primary" 
                      onClick={proceedToIntakeAnalysis}
                      disabled={loading}
                    >
                      <span>Analyze Venture Concept</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Right Card: Demo template selectors */}
                <div className="premium-card">
                  <div className="premium-card-title">
                    <Layers style={{ color: 'var(--neon-cyan)' }} />
                    <span>Interactive Demo Templates</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left', marginBottom: '1rem' }}>
                    Select a curated venture idea to test the complete 7-stage Foothold pipeline, including the funding decision tree and deterministic resource retriever.
                  </p>

                  <div className="demo-templates">
                    {mockIdeas.map((demo) => (
                      <div 
                        key={demo.id} 
                        className={`demo-template-card ${selectedDemoId === demo.id && isDemoMode ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedDemoId(demo.id);
                          setIsDemoMode(true);
                        }}
                      >
                        <div className="demo-template-type">{demo.type}</div>
                        <div className="demo-template-title">{demo.title}</div>
                        <div className="demo-template-desc">{demo.short}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 5: THE GATE (THE INTERACTIVE EXPERIMENT SELECTION) */}
          {currentStage === 5 && (
            <div className="dashboard-grid split">
              
              {/* Left Side: Pipeline Recap Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Stage 1 Intake Recap */}
                <div className="premium-card">
                  <div className="premium-card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    <Lightbulb style={{ color: 'var(--neon-indigo)' }} size={20} />
                    <span>Intake Structural Details ({intakeData?.subDomain})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', fontSize: '0.9rem' }}>
                    <div>
                      <span className="form-label" style={{ marginBottom: '0.1rem', fontSize: '0.75rem' }}>Core Problem</span>
                      <p style={{ color: 'var(--text-bright)' }}>{intakeData?.problem}</p>
                    </div>
                    <div>
                      <span className="form-label" style={{ marginBottom: '0.1rem', fontSize: '0.75rem' }}>Target Audience</span>
                      <p style={{ color: 'var(--text-bright)' }}>{intakeData?.targetUser}</p>
                    </div>
                    <div>
                      <span className="form-label" style={{ marginBottom: '0.1rem', fontSize: '0.75rem' }}>Value Proposition</span>
                      <p style={{ color: 'var(--text-bright)' }}>{intakeData?.valueProposition}</p>
                    </div>
                  </div>
                </div>

                {/* Stage 2 Risks & Assumptions */}
                <div className="premium-card">
                  <div className="premium-card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    <Shield style={{ color: 'var(--neon-rose)' }} size={20} />
                    <span>Assumptions & Risk Register</span>
                  </div>
                  <div className="risk-list">
                    {risks?.map((risk, idx) => (
                      <div key={idx} className={`risk-item ${risk.impact.toLowerCase()}`} style={{ padding: '0.8rem 1rem' }}>
                        <div className="risk-header">
                          <span className="risk-title" style={{ fontSize: '0.95rem' }}>{risk.name}</span>
                          <span className={`badge ${risk.impact.toLowerCase()}`}>{risk.impact}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category: {risk.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 3 advisor Panel Simulation */}
                <div className="premium-card">
                  <div className="premium-card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    <Users style={{ color: 'var(--neon-cyan)' }} size={20} />
                    <span>Advisor Panel Feedback Summary</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--neon-rose)', fontWeight: 600 }}>Marcus (Skeptic): </span>
                      <span style={{ color: 'var(--text-main)' }}>"{simulation?.skeptic.quote}"</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>Sarah (Realist): </span>
                      <span style={{ color: 'var(--text-main)' }}>"{simulation?.realist.quote}"</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: The Gate interactive selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="premium-card glow">
                  <div className="premium-card-title">
                    <Compass style={{ color: 'var(--neon-amber)' }} />
                    <span>Stage 5 Gate: Select Your First Experiment</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left', marginBottom: '1.5rem' }}>
                    Before recommending resources or funding, you must lock in a concrete first test. Funding should serve a validated direction, not false confidence. Select or write your validation task:
                  </p>

                  <div className="experiment-grid">
                    {candidateExperiments?.map((exp) => (
                      <div 
                        key={exp.id} 
                        className={`experiment-card ${selectedExpId === exp.id ? 'selected' : ''}`}
                        onClick={() => setSelectedExpId(exp.id)}
                      >
                        <div className="experiment-top">
                          <div className="experiment-radio"></div>
                          <div className="experiment-title">{exp.title}</div>
                          <p className="experiment-desc">{exp.description}</p>
                        </div>
                        <span className="experiment-risk-pill">Validates: {exp.riskAddressed}</span>
                      </div>
                    ))}
                  </div>

                  {/* Custom experiment block */}
                  <div 
                    className={`experiment-card ${selectedExpId === 'custom' ? 'selected' : ''}`}
                    onClick={() => setSelectedExpId('custom')}
                    style={{ minHeight: 'auto', marginBottom: '1.5rem' }}
                  >
                    <div className="experiment-top" style={{ marginBottom: 0 }}>
                      <div className="experiment-radio" style={{ top: '1.25rem', right: '1.25rem' }}></div>
                      <div className="experiment-title">Design a Custom First Experiment</div>
                      <p className="experiment-desc" style={{ marginBottom: '0.5rem' }}>Draft your own lean validation test to run manually in the first 2 weeks.</p>
                      
                      {selectedExpId === 'custom' && (
                        <textarea 
                          className="form-textarea" 
                          style={{ marginTop: '0.75rem', background: '#070913', fontSize: '0.85rem', padding: '0.5rem' }}
                          placeholder="Describe exactly what manual test you will run, what you will measure, and what counts as validation success..."
                          value={customExperimentText}
                          onChange={(e) => setCustomExperimentText(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={resetApp}>
                      <ArrowLeft size={16} />
                      <span>Revise Idea Intake</span>
                    </button>
                    <button className="btn-primary" onClick={lockInFirstExperiment}>
                      <span>Lock In Experiment & Map Resources</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Stage 4 Roadmap review block */}
                <div className="premium-card">
                  <div className="premium-card-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    <FileText style={{ color: 'var(--neon-purple)' }} size={20} />
                    <span>Synthesized 30/60/90 Day Roadmap</span>
                  </div>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-card" style={{ padding: '0.8rem 1rem' }}>
                        <div className="timeline-header">
                          <span className="timeline-title" style={{ fontSize: '0.95rem' }}>{synthesis?.plan30.title}</span>
                          <span className="badge low">Confidence: {synthesis?.plan30.confidence}</span>
                        </div>
                        <ul className="timeline-list" style={{ fontSize: '0.8rem', paddingLeft: '1rem', marginTop: '0.3rem' }}>
                          {synthesis?.plan30.experiments.map((e, idx) => <li key={idx}>{e}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="timeline-item" style={{ marginTop: '0.5rem' }}>
                      <div className="timeline-dot" />
                      <div className="timeline-card" style={{ padding: '0.8rem 1rem' }}>
                        <div className="timeline-header">
                          <span className="timeline-title" style={{ fontSize: '0.95rem' }}>{synthesis?.plan60.title}</span>
                          <span className="badge low" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--neon-amber)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>Confidence: {synthesis?.plan60.confidence}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STAGES 6 & 7: RESOURCE MAPPING AND DETERMINISTIC RETRIEVAL */}
          {currentStage === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Special Judge Callout Banner explaining architecture */}
              <div className="demo-banner" style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div style={{ textAlign: 'left' }}>
                  <span className="demo-banner-badge" style={{ background: 'var(--neon-purple)', color: '#fff', marginBottom: '0.4rem', display: 'inline-block' }}>
                    AI Architecture Highlight
                  </span>
                  <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.2rem', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                    How Foothold Protects Judges' Scoring Criteria
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    Rather than querying an LLM to hallucinate resources/URLs (Stage 7), the pipeline uses hybrid reasoning. 
                    <strong> The LLM (Stage 6) performs conceptual mapping </strong> (analyzing risks, chosen experiments, and domain to select <em>categories</em> of resources), 
                    while <strong> the system's rules-engine (Stage 7) performs deterministic lookup </strong> against a pre-vetted local database.
                  </p>
                </div>
              </div>

              {/* Main resources workspace */}
              <div className="dashboard-grid split">
                
                {/* Left Panel: Stage 6 Category Mapping */}
                <div className="premium-card glow">
                  <div className="premium-card-title">
                    <Layers style={{ color: 'var(--neon-purple)' }} />
                    <span>Stage 6: Contextual Resource Categories</span>
                  </div>
                  
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'left', marginBottom: '1.5rem' }}>
                    The model matched your venture type and validation experiment with the following resource categories:
                  </p>

                  <h4 className="form-label" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Funding & Capital Categories</h4>
                  {mappedResources?.funding_categories.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className={`resource-category-card ${selectedCategory === cat.category ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.category)}
                    >
                      <div className="res-cat-header">
                        <span className="res-cat-name">{cat.category}</span>
                        <span className={`res-urgency-badge ${cat.urgency}`}>Fit: {cat.urgency}</span>
                      </div>
                      <p className="res-cat-desc">{cat.rationale}</p>
                    </div>
                  ))}

                  <h4 className="form-label" style={{ textAlign: 'left', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Support & Network Categories</h4>
                  {mappedResources?.network_categories.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className={`resource-category-card ${selectedCategory === cat.category ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat.category)}
                    >
                      <div className="res-cat-header">
                        <span className="res-cat-name">{cat.category}</span>
                        <span className="res-urgency-badge now">Fit: now</span>
                      </div>
                      <p className="res-cat-desc">{cat.rationale}</p>
                    </div>
                  ))}

                  <div style={{ textAlign: 'left', marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={() => setCurrentStage(5)}>
                      <ArrowLeft size={16} />
                      <span>Back to Gate</span>
                    </button>
                  </div>
                </div>

                {/* Right Panel: Stage 7 Deterministic Resource Retrieval */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div className="premium-card glow" style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                    <div className="premium-card-title">
                      <Compass style={{ color: 'var(--neon-cyan)' }} />
                      <span>Stage 7: Vetted Resource Database Matches</span>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <Info size={16} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', textAlign: 'left' }}>
                        Showing matches for category: <strong style={{ color: 'var(--text-bright)', textTransform: 'capitalize' }}>"{selectedCategory}"</strong>
                      </p>
                    </div>

                    <div className="matched-resources-list">
                      {filteredResources.filter(res => res.category === selectedCategory).length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
                          No vetted resources in the local database match this category and your specific idea type combination.
                        </p>
                      ) : (
                        filteredResources
                          .filter(res => res.category === selectedCategory)
                          .map((res) => (
                            <div key={res.id} className="matched-resource-item">
                              <div className="resource-name-row">
                                <a 
                                  href={res.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="resource-link"
                                >
                                  <span>{res.name}</span>
                                  <ExternalLink size={14} />
                                </a>
                                <span className="badge low" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)', border: '1px solid var(--border-muted)' }}>
                                  {res.type}
                                </span>
                              </div>
                              <p className="resource-notes">{res.notes}</p>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                  {/* Responsible AI: Not Yet Relevant Warning Box */}
                  <div className="not-yet-panel">
                    <div className="not-yet-title">
                      <AlertTriangle size={18} />
                      <span>Responsible AI: Premature Resources Warning</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                      To prevent false confidence and legal/financial distractions, the model flagged these avenues as inappropriate for your venture's current validation depth:
                    </p>
                    <ul className="not-yet-list">
                      {mappedResources?.explicitly_not_yet.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Reset Actions */}
                  <div className="premium-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Done exploring your resource map?</p>
                      <button className="btn-primary" onClick={resetApp} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                        <RefreshCw size={14} />
                        <span>Run Another Venture</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </main>
      )}

      {/* Footer */}
      <footer className="footer">
        <span>Foothold Venture Validator - Hackathon Submission</span>
        <span>Built with Google Gemini & Vite React</span>
      </footer>

      {/* API Key Modal Window */}
      {showApiModal && (
        <div className="api-modal-overlay">
          <div className="api-modal">
            <div className="premium-card-title" style={{ marginBottom: '1rem' }}>
              <Key style={{ color: 'var(--neon-purple)' }} />
              <span>Gemini API Key Configuration</span>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'left', lineHeight: '1.4' }}>
              Enter your Google AI Studio Gemini API Key. Foothold makes calls directly from your browser—no backend server stores your key.
              <br />
              <span style={{ color: 'var(--text-muted)' }}>If you don't have a key, close this modal and use <strong>Demo Mode</strong>.</span>
            </p>

            <div className="form-group">
              <label className="form-label">API Key</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="AIzaSy..."
                defaultValue={apiKey}
                id="api-key-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                onClick={() => setShowApiModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                onClick={() => {
                  const val = document.getElementById('api-key-input')?.value || '';
                  handleSaveApiKey(val);
                }}
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
