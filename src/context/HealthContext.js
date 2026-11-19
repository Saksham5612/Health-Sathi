import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  isRegistered: false,
  registrationModal: {
    isOpen: false,
    activeForm: 'worker' // 'worker' or 'doctor'
  },
  qrModal: {
    isOpen: false,
    qrData: null,
    healthId: ''
  },
  userProfile: {
    isOpen: false,
    photoUrl: null
  },
  navbar: {
    isScrolled: false
  },
  sidebar: {
    isOpen: false,
    state: 'compact' // 'collapsed', 'compact', 'expanded'
  },
  animations: {
    heroContentIndex: 0
  }
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_REGISTERED: 'SET_REGISTERED',
  TOGGLE_REGISTRATION_MODAL: 'TOGGLE_REGISTRATION_MODAL',
  SET_REGISTRATION_FORM: 'SET_REGISTRATION_FORM',
  SHOW_QR_MODAL: 'SHOW_QR_MODAL',
  HIDE_QR_MODAL: 'HIDE_QR_MODAL',
  TOGGLE_USER_PROFILE: 'TOGGLE_USER_PROFILE',
  SET_NAVBAR_SCROLLED: 'SET_NAVBAR_SCROLLED',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR_STATE: 'SET_SIDEBAR_STATE',
  SET_HERO_CONTENT_INDEX: 'SET_HERO_CONTENT_INDEX',
  SET_PROFILE_PHOTO: 'SET_PROFILE_PHOTO'
};

// Reducer
function healthReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isRegistered: true
      };

    case ActionTypes.SET_REGISTERED:
      return {
        ...state,
        isRegistered: action.payload
      };

    case ActionTypes.TOGGLE_REGISTRATION_MODAL:
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          isOpen: action.payload !== undefined ? action.payload : !state.registrationModal.isOpen
        }
      };

    case ActionTypes.SET_REGISTRATION_FORM:
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          activeForm: action.payload
        }
      };

    case ActionTypes.SHOW_QR_MODAL:
      return {
        ...state,
        qrModal: {
          isOpen: true,
          qrData: action.payload.qrData,
          healthId: action.payload.healthId
        },
        registrationModal: {
          ...state.registrationModal,
          isOpen: false
        }
      };

    case ActionTypes.HIDE_QR_MODAL:
      return {
        ...state,
        qrModal: {
          isOpen: false,
          qrData: null,
          healthId: ''
        }
      };

    case ActionTypes.TOGGLE_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          isOpen: action.payload !== undefined ? action.payload : !state.userProfile.isOpen
        }
      };

    case ActionTypes.SET_NAVBAR_SCROLLED:
      return {
        ...state,
        navbar: {
          ...state.navbar,
          isScrolled: action.payload
        }
      };

    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isOpen: action.payload !== undefined ? action.payload : !state.sidebar.isOpen
        }
      };

    case ActionTypes.SET_SIDEBAR_STATE:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          state: action.payload
        }
      };

    case ActionTypes.SET_HERO_CONTENT_INDEX:
      return {
        ...state,
        animations: {
          ...state.animations,
          heroContentIndex: action.payload
        }
      };

    case ActionTypes.SET_PROFILE_PHOTO:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          photoUrl: action.payload
        }
      };

    default:
      return state;
  }
}

// Context
const HealthContext = createContext();

// Provider component
export function HealthContextProvider({ children }) {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  // Actions
  const actions = {
    setUser: (userData) => {
      dispatch({ type: ActionTypes.SET_USER, payload: userData });
    },

    setRegistered: (isRegistered) => {
      dispatch({ type: ActionTypes.SET_REGISTERED, payload: isRegistered });
    },

    toggleRegistrationModal: (isOpen) => {
      dispatch({ type: ActionTypes.TOGGLE_REGISTRATION_MODAL, payload: isOpen });
    },

    setRegistrationForm: (formType) => {
      dispatch({ type: ActionTypes.SET_REGISTRATION_FORM, payload: formType });
    },

    showQRModal: (qrData, healthId) => {
      dispatch({ 
        type: ActionTypes.SHOW_QR_MODAL, 
        payload: { qrData, healthId } 
      });
    },

    hideQRModal: () => {
      dispatch({ type: ActionTypes.HIDE_QR_MODAL });
    },

    toggleUserProfile: (isOpen) => {
      dispatch({ type: ActionTypes.TOGGLE_USER_PROFILE, payload: isOpen });
    },

    setNavbarScrolled: (isScrolled) => {
      dispatch({ type: ActionTypes.SET_NAVBAR_SCROLLED, payload: isScrolled });
    },

    toggleSidebar: (isOpen) => {
      dispatch({ type: ActionTypes.TOGGLE_SIDEBAR, payload: isOpen });
    },

    setSidebarState: (state) => {
      dispatch({ type: ActionTypes.SET_SIDEBAR_STATE, payload: state });
    },

    setHeroContentIndex: (index) => {
      dispatch({ type: ActionTypes.SET_HERO_CONTENT_INDEX, payload: index });
    },

    setProfilePhoto: (photoUrl) => {
      dispatch({ type: ActionTypes.SET_PROFILE_PHOTO, payload: photoUrl });
    }
  };

  // Generate unique health ID
  const generateHealthId = (type = 'worker') => {
    const prefix = type === 'doctor' ? 'HealthID-Dr-200-' : 'HealthID-200-';
    const randomNum = Math.floor(100 + Math.random() * 900);
    return prefix + randomNum;
  };

  // Register user function
  const registerUser = (formData, type = 'worker') => {
    const healthId = generateHealthId(type);
    const userData = {
      ...formData,
      healthId,
      type,
      registeredAt: new Date().toISOString()
    };

    actions.setUser(userData);
    
    // Generate QR data
    const qrData = JSON.stringify(userData);
    actions.showQRModal(qrData, healthId);

    return { userData, qrData, healthId };
  };

  const value = {
    state,
    actions,
    registerUser,
    generateHealthId
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
}

// Custom hook to use the context
export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthContextProvider');
  }
  return context;
}

export { ActionTypes };