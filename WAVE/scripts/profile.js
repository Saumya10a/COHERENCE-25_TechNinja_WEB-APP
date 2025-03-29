document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Check Local Storage for Theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️"; // Sun icon for Light mode
    }

    themeToggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save Theme Preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀️"; // Change to Sun
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌙"; // Change to Moon
        }
    });

    // Check if we're on the profile page
    const isProfilePage = window.location.pathname.includes('profile.html') && !window.location.pathname.includes('edit-profile');
    
    // Check if we're on the edit profile page
    const isEditProfilePage = window.location.pathname.includes('edit-profile.html');

    if (isProfilePage) {
        // Load user profile data
        fetchUserProfile();
    } else if (isEditProfilePage) {
        // Load user data for editing
        loadUserDataForEdit();
        
        // Set up profile image upload
        setupProfileImageUpload();
        
        // Set up form submission
        const editForm = document.getElementById('edit-profile-form');
        if (editForm) {
            editForm.addEventListener('submit', handleProfileUpdate);
        }
    }
});

// Function to fetch user profile data from server
async function fetchUserProfile() {
    try {
        // In a real application, you would get the user ID from the session or localStorage
        const userId = localStorage.getItem('userId');
        
        // Make API request to your backend
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        
        // Update the UI with user data
        displayUserProfile(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        
        // For demonstration purposes, use mock data if API fails
        // In production, you'd want to show an error message instead
        const mockUserData = {
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            phone: '9876543210',
            city: 'Mumbai',
            profileImage: null
        };
        
        displayUserProfile(mockUserData);
    }
}

// Function to display user profile data
function displayUserProfile(userData) {
    // Set the username and email
    document.getElementById('username').textContent = userData.username;
    document.getElementById('email').textContent = userData.email;
    
    // Set phone and city if available
    if (userData.phone) {
        document.getElementById('phone').textContent = userData.phone;
    }
    
    if (userData.city) {
        document.getElementById('city').textContent = userData.city;
    }
    
    // Handle profile image
    if (userData.profileImage) {
        const profilePic = document.getElementById('profile-picture');
        profilePic.src = userData.profileImage;
        profilePic.style.display = 'block';
        document.getElementById('profile-placeholder').style.display = 'none';
    } else {
        // Show placeholder with initials
        const initials = getInitials(userData.username);
        document.getElementById('initials').textContent = initials;
        document.getElementById('profile-placeholder').style.display = 'flex';
        document.getElementById('profile-picture').style.display = 'none';
    }
}

// Function to load user data for edit page
async function loadUserDataForEdit() {
    try {
        // In a real application, you would get the user ID from the session or localStorage
        const userId = localStorage.getItem('userId');
        
        // Make API request to your backend
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        
        // Fill the form with user data
        fillEditForm(userData);
    } catch (error) {
        console.error('Error loading user data for edit:', error);
        
        // For demonstration purposes, use mock data if API fails
        const mockUserData = {
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            phone: '9876543210',
            city: 'Mumbai',
            profileImage: null
        };
        
        fillEditForm(mockUserData);
    }
}

// Function to fill edit form with user data
function fillEditForm(userData) {
    document.getElementById('edit-username').value = userData.username;
    document.getElementById('edit-email').value = userData.email;
    document.getElementById('edit-phone').value = userData.phone || '';
    document.getElementById('edit-city').value = userData.city || '';
    
    // Handle profile image
    if (userData.profileImage) {
        const profilePic = document.getElementById('edit-profile-picture');
        profilePic.src = userData.profileImage;
        profilePic.style.display = 'block';
        document.getElementById('edit-profile-placeholder').style.display = 'none';
    } else {
        // Show placeholder with initials
        const initials = getInitials(userData.username);
        document.getElementById('edit-initials').textContent = initials;
        document.getElementById('edit-profile-placeholder').style.display = 'flex';
        document.getElementById('edit-profile-picture').style.display = 'none';
    }
}

// Function to set up profile image upload preview
function setupProfileImageUpload() {
    const fileInput = document.getElementById('profile-upload');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const profilePic = document.getElementById('edit-profile-picture');
                    profilePic.src = e.target.result;
                    profilePic.style.display = 'block';
                    document.getElementById('edit-profile-placeholder').style.display = 'none';
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
}

// Function to handle profile update form submission
async function handleProfileUpdate(event) {
    event.preventDefault();
    
    const form = event.target;
    const userId = localStorage.getItem('userId');
    
    const formData = new FormData();
    formData.append('username', form.username.value);
    formData.append('phone', form.phone.value);
    formData.append('city', form.city.value);
    
    // Add profile image if selected
    const fileInput = document.getElementById('profile-upload');
    if (fileInput.files.length > 0) {
        formData.append('profileImage', fileInput.files[0]);
    }
    
    try {
        // Make API request to update user profile
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        
        // Redirect to profile page after successful update
        window.location.href = 'profile.html';
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
        
        // For demonstration purposes, redirect anyway
        // In production, you'd want to show an error message instead
        window.location.href = 'profile.html';
    }
}

// Helper function to get initials from username
function getInitials(username) {
    if (!username) return '';
    
    const names = username.split(' ');
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    } else {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
}