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

    function getAllListings() {
        const stored = localStorage.getItem(LS_KEY);
        if (stored !== null) return JSON.parse(stored);
        saveAllListings(defaultListings);
        return JSON.parse(JSON.stringify(defaultListings));
    }

    function saveAllListings(list) {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    }

    $scope.locations       = [];
    $scope.newLocation     = {};
    $scope.editingLocation = {};
    $scope.showAddModal    = false;
    $scope.showEditModal   = false;

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

    // Load from localStorage
    $scope.locations = getAllListings();

    // Add
    $scope.addLocation = function() {
        if (!$scope.newLocation.name || !$scope.newLocation.description) return;
        const newObj = {
            id:          'local_' + Date.now(),
            name:        $scope.newLocation.name,
            description: $scope.newLocation.description,
            image:       $scope.newLocation.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
            rating:      0,
            reviews:     []
        };
        const list = getAllListings();
        list.push(newObj);
        saveAllListings(list);
        $scope.locations    = list;
        $scope.showAddModal = false;
        $scope.newLocation  = {};

        firebase.database().ref('listings').push({
            name: newObj.name, description: newObj.description,
            image: newObj.image, rating: newObj.rating, reviews: newObj.reviews
        }).catch(e => console.warn("Firebase backup failed. Data saved in browser storage."));
    };

    // Edit
    $scope.saveEdit = function() {
        const list = getAllListings();
        const idx  = list.findIndex(l => l.id === $scope.editingLocation.id);
        if (idx > -1) {
            list[idx] = Object.assign({}, list[idx], {
                name:        $scope.editingLocation.name,
                description: $scope.editingLocation.description,
                image:       $scope.editingLocation.image || list[idx].image
            });
            saveAllListings(list);
            $scope.locations = list;
        }
        $scope.showEditModal = false;
    };

    // Delete
    $scope.deleteLocation = function(location) {
        if (!confirm("Are you sure you want to delete this destination?")) return;
        let list = getAllListings();
        list = list.filter(l => l.id !== location.id);
        saveAllListings(list);
        $scope.locations = list;

        firebase.database().ref('listings/' + location.id).remove()
            .catch(e => console.warn("Firebase delete silently failed."));
    };

    // Review
    $scope.addReview = function(location) {
        if (!location.newReview) return;
        const list = getAllListings();
        const item = list.find(l => l.id === location.id);
        if (item) {
            item.reviews = item.reviews || [];
            item.reviews.push(location.newReview);
            saveAllListings(list);
            location.reviews   = item.reviews;
            location.newReview = '';
        }
    };

    // Rate
    $scope.rateLocation = function(location, star) {
        const list = getAllListings();
        const item = list.find(l => l.id === location.id);
        if (item) {
            item.rating    = star;
            location.rating = star;
            saveAllListings(list);
        }
    };
});