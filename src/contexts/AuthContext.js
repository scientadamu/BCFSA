import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = {
    'admin@bcfsa.org': {
      id: 1,
      email: 'admin@bcfsa.org',
      password: 'admin123',
      role: 'admin',
      name: 'System Administrator',
      avatar: '/api/placeholder/40/40',
      permissions: ['all']
    },
    'trainer@bcfsa.org': {
      id: 2,
      email: 'trainer@bcfsa.org',
      password: 'trainer123',
      role: 'trainer',
      name: 'John Trainer',
      avatar: '/api/placeholder/40/40',
      permissions: ['view_students', 'create_assessments', 'view_reports']
    },
    'student@bcfsa.org': {
      id: 3,
      email: 'student@bcfsa.org',
      password: 'student123',
      role: 'trainee',
      name: 'Jane Student',
      avatar: '/api/placeholder/40/40',
      permissions: ['view_profile', 'submit_reports', 'view_assessments']
    },
    'corp@bcfsa.org': {
      id: 4,
      email: 'corp@bcfsa.org',
      password: 'corp123',
      role: 'corp_member',
      name: 'NYSC Corp Member',
      avatar: '/api/placeholder/40/40',
      permissions: ['view_profile', 'print_clearance']
    }
  };

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('bcfsa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication
      const foundUser = mockUsers[email];
      if (foundUser && foundUser.password === password) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('bcfsa_user', JSON.stringify(userWithoutPassword));

        // Determine dashboard route based on user role
        let dashboardRoute = '/';
        switch (userWithoutPassword.role) {
          case 'admin':
            dashboardRoute = '/admin';
            break;
          case 'trainer':
            dashboardRoute = '/trainer';
            break;
          case 'trainee':
            dashboardRoute = '/student';
            break;
          case 'corp_member':
            dashboardRoute = '/corp';
            break;
          default:
            dashboardRoute = '/';
        }

        return { success: true, user: userWithoutPassword, redirectTo: dashboardRoute };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bcfsa_user');
  };

  const updateProfile = async (profileData) => {
    try {
      // Mock profile update
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('bcfsa_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Mock password change
      const foundUser = mockUsers[user.email];
      if (foundUser && foundUser.password === currentPassword) {
        // In a real app, you'd update the password in the backend
        return { success: true };
      } else {
        return { success: false, error: 'Current password is incorrect' };
      }
    } catch (error) {
      return { success: false, error: 'Failed to change password' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      // Mock forgot password
      if (mockUsers[email]) {
        // In a real app, you'd send a reset email
        return { success: true, message: 'Password reset instructions sent to your email' };
      } else {
        return { success: false, error: 'Email not found' };
      }
    } catch (error) {
      return { success: false, error: 'Failed to process request' };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
