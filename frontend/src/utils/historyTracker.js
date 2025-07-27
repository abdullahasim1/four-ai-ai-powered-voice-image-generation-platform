export const trackActivity = (feature, description) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) return;

  // Get existing history or initialize empty array
  const userHistory = JSON.parse(localStorage.getItem("userHistory") || "[]");

  // Add new activity
  const newActivity = {
    feature,
    description,
    timestamp: new Date().toISOString()
  };

  // Add to beginning of array (most recent first)
  userHistory.unshift(newActivity);

  // Keep only last 50 activities
  const trimmedHistory = userHistory.slice(0, 50);

  // Save back to localStorage
  localStorage.setItem("userHistory", JSON.stringify(trimmedHistory));
}; 