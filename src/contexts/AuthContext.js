import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

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
      // Use real API for authentication
      const response = await apiService.login(email, password);

      if (response.success) {
        const userWithoutPassword = response.user;
        setUser(userWithoutPassword);
        localStorage.setItem('bcfsa_user', JSON.stringify(userWithoutPassword));

        // Store auth token if provided
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }

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
        return { success: false, error: response.message || 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bcfsa_user');
    localStorage.removeItem('authToken');
  };

  const updateProfile = async (profileData) => {
    try {
      // Use real API for profile update
      const response = await apiService.updateProfile(profileData);

      if (response.success) {
        const updatedUser = { ...user, ...response.user };
        setUser(updatedUser);
        localStorage.setItem('bcfsa_user', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message || 'Failed to update profile' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Use real API for password change
      const response = await apiService.changePassword(currentPassword, newPassword);

      if (response.success) {
        return { success: true, message: 'Password changed successfully' };
      } else {
        return { success: false, error: response.message || 'Failed to change password' };
      }
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: error.message || 'Failed to change password' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      // Use real API for forgot password
      const response = await apiService.forgotPassword(email);

      if (response.success) {
        return { success: true, message: response.message || 'Password reset instructions sent to your email' };
      } else {
        return { success: false, error: response.message || 'Email not found' };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: error.message || 'Failed to process request' };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    // Admin users have all permissions
    if (user.role === 'admin') return true;

    // Check if user has specific permissions array
    if (user.permissions) {
      return user.permissions.includes('all') || user.permissions.includes(permission);
    }

    // Default role-based permissions
    const rolePermissions = {
      admin: ['all'],
      trainer: ['view_students', 'manage_courses', 'view_reports'],
      trainee: ['view_profile', 'view_courses', 'submit_assignments'],
      corp_member: ['view_profile', 'print_clearance', 'view_courses']
    };

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
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
