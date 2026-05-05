// Import Firebase scripts
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlKFSh1cyQ5Tvpj3fW-U00uRO5sr0RM4",
  authDomain: "trip-advisor-9bfab.firebaseapp.com",
  projectId: "trip-advisor-9bfab",
  databaseURL: "https://trip-advisor-9bfab-default-rtdb.firebaseio.com",
  storageBucket: "trip-advisor-9bfab.appspot.com",
  messagingSenderId: "963916169319",
  appId: "1:963916169319:web:be01c78633dcdd15b314c2",
  measurementId: "G-WR5G165V5L"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// (Optional) Remove analytics if not used
// const analytics = firebase.getAnalytics(firebaseApp);

var app = angular.module('tripAdvisorApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            template: `
                <div class="login-container" style="text-align: center; margin-top: 80px;">
                    <h2 style="color: #00a680; font-size: 2.5rem; margin-bottom: 20px;">Welcome to TripAdvisor Clone</h2>
                    <p style="font-size: 1.2rem; color: #555; margin-bottom: 40px;">Please sign in to access the destinations and reviews.</p>
                    <button ng-click="login()" style="padding: 14px 28px; font-size: 1.2rem; border-radius: 8px; cursor: pointer; background: #00a680; color: white; border: none; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: background 0.2s;">
                        Sign In with Google
                    </button>
                </div>
            `,
            controller: 'LoginController'
        })
        .when('/listings', {
            template: `
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h2 style="margin: 0; font-size: 2rem; color: #0f172a;">Top Destinations</h2>
                    </div>
                    <button class="add-btn" ng-click="openAddModal()" title="Add Destination" ng-if="user" style="z-index: 9999;">+</button>
                    <div ng-show="showAddModal" class="modal-bg">
                        <div class="modal" style="position:relative;">
                            <span class="close-modal" ng-click="closeAddModal()">&times;</span>
                            <h2>Add Destination</h2>
                            <form ng-submit="addLocation()">
                                <input type="text" ng-model="newLocation.name" placeholder="Destination Name" required>
                                <input type="text" ng-model="newLocation.description" placeholder="Description" required>
                                <input type="text" ng-model="newLocation.image" placeholder="Image URL (optional)">
                                <button type="submit">Add Location</button>
                            </form>
                        </div>
                    </div>
                    <div ng-show="showEditModal" class="modal-bg">
                        <div class="modal" style="position:relative;">
                            <span class="close-modal" ng-click="closeEditModal()">&times;</span>
                            <h2>Edit Destination</h2>
                            <form ng-submit="saveEdit()">
                                <input type="text" ng-model="editingLocation.name" placeholder="Destination Name" required>
                                <input type="text" ng-model="editingLocation.description" placeholder="Description" required>
                                <input type="text" ng-model="editingLocation.image" placeholder="Image URL (optional)">
                                <button type="submit">Save Changes</button>
                            </form>
                        </div>
                    </div>
                    <div class="location-list">
                        <div class="location-card" ng-repeat="location in locations">
                            <div class="card-image-wrapper">
                                <img ng-if="location.image" ng-src="{{location.image}}" alt="{{location.name}}">
                            </div>
                            <div class="location-card-content">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <h3 style="margin: 0;">{{location.name}}</h3>
                                    <div ng-if="user" style="display: flex; gap: 8px;">
                                        <button ng-click="openEditModal(location)" style="background: none; border: none; color: #64748b; font-size: 1.1rem; cursor: pointer; padding: 0; line-height: 1;" title="Edit Destination">&#9998;</button>
                                        <button ng-click="deleteLocation(location)" style="background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0; line-height: 1;" title="Delete Destination">&times;</button>
                                    </div>
                                </div>
                                <p>{{location.description}}</p>
                                <div class="stars">
                                    <span ng-repeat="star in [1,2,3,4,5]" ng-click="user && rateLocation(location, star)" class="star" ng-style="{'cursor': user ? 'pointer' : 'default'}">
                                        <span ng-if="star <= location.rating">&#9733;</span>
                                        <span ng-if="star > location.rating">&#9734;</span>
                                    </span>
                                    <span class="rating-count">({{location.rating || 0}}/5)</span>
                                </div>
                                <div class="reviews">
                                    <form class="review-form" ng-submit="addReview(location)" ng-if="user">
                                        <input type="text" ng-model="location.newReview" placeholder="Add a review...">
                                        <button type="submit">Post</button>
                                    </form>
                                    <p ng-if="!user" style="font-size: 0.85rem; color: #888; font-style: italic; margin-top: 10px;">Sign in to rate and review.</p>
                                    <ul>
                                        <li ng-repeat="review in location.reviews">{{review}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            controller: 'ListingsController'
        })
        .when('/about', {
            template: `
                <div style="padding: 40px; text-align: center; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <h2 style="color: #00a680; font-size: 2.5rem; margin-bottom: 20px;">About TripAdvisor Clone</h2>
                    <p style="font-size: 1.2rem; color: #555; max-width: 800px; margin: 0 auto 30px auto; line-height: 1.6;">
                        This is a modern, single-page application built using AngularJS and Firebase. 
                        Our mission is to help travelers discover the best destinations around the world.
                        You can browse stunning locations, read authentic reviews, and share your own travel experiences!
                    </p>
                    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" alt="Travel" style="width: 100%; max-width: 600px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
                </div>
            `
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.run(function($rootScope, $location) {
    $rootScope.user = null;
    $rootScope.authInitialized = false;

    firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.authInitialized = true;
        $rootScope.user = user;
        $rootScope.$applyAsync(function() {
            if (user) {
                if ($location.path() === '/login') {
                    $location.path('/listings');
                }
            } else {
                $location.path('/login');
            }
        });
    });

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if ($rootScope.authInitialized && !$rootScope.user) {
            if (next && next.originalPath !== '/login') {
                $location.path('/login');
            }
        }
    });
});

app.controller('AuthController', function($scope, $rootScope) {
    $scope.logout = function() {
        firebase.auth().signOut();
    };
});

app.controller('LoginController', function($scope, $rootScope) {
    $scope.login = function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            console.error("Login failed", error);
            alert("Login failed: " + error.message);
        });
    };
});

app.controller('ListingsController', function($scope, $rootScope) {

    const LS_KEY = 'trip_advisor_listings_v1';

    const defaultListings = [
        { id: 'def_0', name: "Eiffel Tower", description: "The iconic wrought-iron lattice tower on the Champ de Mars in Paris.", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["A must-see in Paris!"] },
        { id: 'def_1', name: "Colosseum", description: "The legendary ancient amphitheatre in the heart of Rome, Italy.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", rating: 4, reviews: ["Breathtaking history."] },
        { id: 'def_2', name: "Santorini", description: "Stunning white-washed buildings overlooking the turquoise Aegean Sea.", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The best sunset ever."] }
    ];

    // --- localStorage cache helpers ---
    function getCached() {
        const s = localStorage.getItem(LS_KEY);
        return s ? JSON.parse(s) : null;
    }
    function setCache(list) {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    }

    // --- State ---
    $scope.locations       = [];
    $scope.newLocation     = {};
    $scope.editingLocation = {};
    $scope.showAddModal    = false;
    $scope.showEditModal   = false;
    $scope.dbError         = false; // true if Firebase rules are blocking writes

    $scope.openAddModal  = function() { $scope.showAddModal  = true; };
    $scope.closeAddModal = function() { $scope.showAddModal  = false; };
    $scope.openEditModal = function(location) {
        $scope.editingLocation  = angular.copy(location);
        $scope.originalLocation = location;
        $scope.showEditModal    = true;
    };
    $scope.closeEditModal = function() {
        $scope.showEditModal   = false;
        $scope.editingLocation = {};
    };

    // --- LOAD ---
    // Show cached data immediately for fast UI, then sync from Firebase
    function loadLocations() {
        const cached = getCached();
        if (cached && cached.length > 0) {
            $scope.locations = cached;
            $scope.$applyAsync();
        }

        // Now fetch live data from Firebase
        firebase.database().ref('listings').once('value').then(function(snapshot) {
            const data = snapshot.val();

            if (!data || Object.keys(data).length === 0) {
                // Firebase is empty — seed defaults and save to Firebase
                if ($rootScope.user) {
                    const promises = defaultListings.map(item => {
                        return firebase.database().ref('listings').push({
                            name: item.name,
                            description: item.description,
                            image: item.image,
                            rating: item.rating,
                            reviews: item.reviews
                        }).then(ref => ({ id: ref.key, ...item }));
                    });
                    Promise.all(promises).then(seeded => {
                        setCache(seeded);
                        $scope.locations = seeded;
                        $scope.$applyAsync();
                    });
                } else {
                    // Not logged in — show defaults from localStorage or hardcoded
                    const fallback = cached || defaultListings;
                    setCache(fallback);
                    $scope.locations = fallback;
                    $scope.$applyAsync();
                }
            } else {
                // Firebase has data — use it as source of truth
                const list = Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    image: data[key].image,
                    rating: data[key].rating || 0,
                    reviews: data[key].reviews || []
                }));
                setCache(list);
                $scope.locations = list;
                $scope.$applyAsync();
            }
        }).catch(function(err) {
            console.error("Firebase read error:", err.message);
            // Fallback to cache or defaults
            $scope.locations = getCached() || defaultListings;
            $scope.$applyAsync();
        });
    }
    loadLocations();

    // --- ADD ---
    $scope.addLocation = function() {
        if (!$scope.newLocation.name || !$scope.newLocation.description) return;

        const newObj = {
            name:        $scope.newLocation.name,
            description: $scope.newLocation.description,
            image:       $scope.newLocation.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
            rating:      0,
            reviews:     []
        };

        // Optimistic UI update
        const tempId  = 'temp_' + Date.now();
        const tempObj = { id: tempId, ...newObj };
        $scope.locations.push(tempObj);
        setCache($scope.locations);
        $scope.showAddModal = false;
        $scope.newLocation  = {};

        // Save to Firebase (permanent)
        firebase.database().ref('listings').push(newObj).then(function(ref) {
            // Replace temp ID with real Firebase ID
            const list = getCached();
            const idx  = list.findIndex(l => l.id === tempId);
            if (idx > -1) {
                list[idx].id = ref.key;
                setCache(list);
                $scope.locations = list;
                $scope.$applyAsync();
            }
        }).catch(function(err) {
            console.error("Firebase write blocked:", err.message);
            $scope.dbError = true;
            $scope.$applyAsync();
            alert("⚠️ Firebase rules are blocking saves!\n\nGo to Firebase Console → Realtime Database → Rules and set:\n\n{\n  \"rules\": {\n    \".read\": true,\n    \".write\": \"auth != null\"\n  }\n}\n\nYour data is saved locally until then.");
        });
    };

    // --- EDIT ---
    $scope.saveEdit = function() {
        const id = $scope.editingLocation.id;
        const updated = {
            name:        $scope.editingLocation.name,
            description: $scope.editingLocation.description,
            image:       $scope.editingLocation.image || $scope.originalLocation.image
        };

        // Update UI and cache immediately
        const list = getCached();
        const idx  = list.findIndex(l => l.id === id);
        if (idx > -1) {
            list[idx] = Object.assign({}, list[idx], updated);
            setCache(list);
            $scope.locations = list;
        }
        $scope.showEditModal = false;

        // Save to Firebase
        firebase.database().ref('listings/' + id).update(updated)
            .catch(e => console.warn("Firebase edit blocked. Saved in local cache."));
    };

    // --- DELETE ---
    $scope.deleteLocation = function(location) {
        if (!confirm("Are you sure you want to delete this destination?")) return;

        // Remove from UI and cache immediately
        let list = getCached();
        list = list.filter(l => l.id !== location.id);
        setCache(list);
        $scope.locations = list;

        // Delete from Firebase (permanent across all browsers)
        firebase.database().ref('listings/' + location.id).remove()
            .catch(e => console.warn("Firebase delete blocked. Removed from local cache only."));
    };

    // --- REVIEW ---
    $scope.addReview = function(location) {
        if (!location.newReview) return;
        const reviews = (location.reviews || []).concat([location.newReview]);

        // Update UI and cache
        location.reviews   = reviews;
        location.newReview = '';
        const list = getCached();
        const item = list.find(l => l.id === location.id);
        if (item) { item.reviews = reviews; setCache(list); }

        // Save to Firebase
        firebase.database().ref('listings/' + location.id).update({ reviews: reviews })
            .catch(e => console.warn("Firebase review blocked. Saved in local cache."));
    };

    // --- RATE ---
    $scope.rateLocation = function(location, star) {
        location.rating = star;
        const list = getCached();
        const item = list.find(l => l.id === location.id);
        if (item) { item.rating = star; setCache(list); }

        // Save to Firebase
        firebase.database().ref('listings/' + location.id).update({ rating: star })
            .catch(e => console.warn("Firebase rating blocked. Saved in local cache."));
    };
});