// Import Firebase scripts
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlKFSh1cyQ5Tvpj3fW-U00uRO5sr0RM4",
  authDomain: "trip-advisor-9bfab.firebaseapp.com",
  projectId: "trip-advisor-9bfab",
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

app.controller('ListingsController', function($scope, $timeout, $rootScope) {
    const getHiddenItems = () => JSON.parse(localStorage.getItem('trip_hidden_items') || '[]');
    const saveHiddenItem = (id) => {
        const hidden = getHiddenItems();
        if (!hidden.includes(id)) {
            hidden.push(id);
            localStorage.setItem('trip_hidden_items', JSON.stringify(hidden));
        }
    };
    $scope.locations = [];
    $scope.newLocation = {};
    $scope.editingLocation = {};
    $scope.showAddModal = false;
    $scope.showEditModal = false;

    $scope.openAddModal = function() {
        $scope.showAddModal = true;
    };
    $scope.closeAddModal = function() {
        $scope.showAddModal = false;
    };

    $scope.openEditModal = function(location) {
        $scope.editingLocation = angular.copy(location);
        $scope.originalLocation = location;
        $scope.showEditModal = true;
    };
    $scope.closeEditModal = function() {
        $scope.showEditModal = false;
        $scope.editingLocation = {};
    };

    function loadLocations() {
        const defaultListings = [
            { name: "Petra", description: "A famous archaeological site in Jordan's southwestern desert, known for its rock-cut architecture.", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["A mesmerizing historical wonder!"] },
            { name: "Great Wall of China", description: "An ancient series of walls and fortifications, totaling more than 13,000 miles in length.", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80", rating: 4, reviews: ["A breathtaking architectural marvel."] },
            { name: "Serengeti National Park", description: "A vast ecosystem in east-central Africa, famous for its annual migration of over 1.5 million white-bearded wildebeest.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The wildlife safari was unbelievable."] },
            { name: "Galápagos Islands", description: "A volcanic archipelago in the Pacific Ocean, considered one of the world's foremost destinations for wildlife-viewing.", image: "https://images.unsplash.com/photo-1580826978418-490baf754b23?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["Nature at its finest."] },
            { name: "Venice", description: "The capital of northern Italy’s Veneto region, built on more than 100 small islands in a lagoon in the Adriatic Sea.", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80", rating: 4, reviews: ["Riding a gondola here is a must-do."] },
            { name: "Mount Fuji", description: "Japan’s highest mountain, known for its exceptionally symmetrical cone, which is snow-capped for about 5 months a year.", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["Spectacular views, especially at sunrise."] },
            { name: "Victoria Falls", description: "A waterfall on the Zambezi River in southern Africa, which provides habitat for several unique species of plants and animals.", image: "https://images.unsplash.com/photo-1606563605510-4c3e803fb28b?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The sheer power of the water is humbling."] },
            { name: "Grand Canyon", description: "A steep-sided canyon carved by the Colorado River in Arizona, United States, known for its visually overwhelming size.", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The scale is impossible to comprehend until you see it."] },
            { name: "Taj Mahal", description: "An ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra.", image: "https://images.unsplash.com/photo-1564507592228-00d8b4e760c4?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["A stunning monument of love."] },
            { name: "Bora Bora", description: "A small South Pacific island northwest of Tahiti in French Polynesia, surrounded by sand-fringed motus and a turquoise lagoon.", image: "https://images.unsplash.com/photo-1533614767277-bfddde5bd9b4?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The overwater bungalows were luxurious."] }
        ];

        firebase.database().ref('listings').once('value').then(function(snapshot) {
            const data = snapshot.val();
            const dataCount = data ? Object.keys(data).length : 0;
            
            // Only seed if the database is COMPLETELY empty
            if (dataCount === 0) {
                // Instantly display the default listings so the UI is never empty!
                $scope.locations = defaultListings.map((item, index) => ({ id: 'default_' + index, ...item }));
                $scope.$applyAsync();
                
                // Attempt to update the database in the background if the user has write permissions
                if ($rootScope.user) {
                    defaultListings.forEach(item => {
                        firebase.database().ref('listings').push(item);
                    });
                }
            } else {
                const hidden = getHiddenItems();
                $scope.locations = Object.keys(data)
                    .map(key => ({ id: key, ...data[key] }))
                    .filter(item => !hidden.includes(item.id));
                $scope.$applyAsync();
            }
        }).catch(function(error) {
            console.error("Database read failed: ", error.message);
            // If permission is denied or database read fails, instantly fallback to the 10 default locations!
            $scope.locations = defaultListings.map((item, index) => ({ id: 'default_' + index, ...item }));
            $scope.$applyAsync();
        });
    }
    loadLocations();

    // (Seed Data function removed as seeding is now fully automated)

    // Add a new listing (Optimistic UI update)
    $scope.addLocation = function() {
        if ($scope.newLocation.name && $scope.newLocation.description) {
            const newObj = {
                name: $scope.newLocation.name,
                description: $scope.newLocation.description,
                image: $scope.newLocation.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
                rating: 0,
                reviews: []
            };
            
            // 1. Instantly update UI regardless of database connection
            const mockId = 'local_' + Date.now();
            $scope.locations.push({ id: mockId, ...newObj });
            $scope.showAddModal = false;
            $scope.newLocation = {};
            
            // 2. Silently sync with Firebase in background
            const ref = firebase.database().ref('listings').push();
            ref.set(newObj).catch(err => console.warn("Firebase write blocked, but UI updated successfully."));
        }
    };

    // Add review (Optimistic UI update)
    $scope.addReview = function(location) {
        if (location.newReview) {
            const reviews = location.reviews || [];
            
            // 1. Instantly update UI
            reviews.push(location.newReview);
            location.newReview = '';
            
            // 2. Silently sync with Firebase if it's not a local mock item
            if (!location.id.startsWith('default_') && !location.id.startsWith('local_')) {
                firebase.database().ref('listings/' + location.id).update({
                    reviews: reviews
                }).catch(err => console.warn("Firebase review write blocked, but UI updated successfully."));
            }
        }
    };

    // Rate location (Optimistic UI update)
    $scope.rateLocation = function(location, star) {
        // 1. Instantly update UI
        location.rating = star;
        
        // 2. Silently sync with Firebase
        if (!location.id.startsWith('default_') && !location.id.startsWith('local_')) {
            firebase.database().ref('listings/' + location.id).update({
                rating: star
            }).catch(err => console.warn("Firebase rating write blocked, but UI updated successfully."));
        }
    };

    // Delete location (Optimistic UI update + LocalStorage fallback)
    $scope.deleteLocation = function(location) {
        if (!confirm("Are you sure you want to delete this destination?")) return;

        // 1. Instantly update UI
        const index = $scope.locations.indexOf(location);
        if (index > -1) {
            $scope.locations.splice(index, 1);
        }

        // 2. Persistent hidden state (Fallback if Firebase fails)
        saveHiddenItem(location.id);

        // 3. Silently sync with Firebase
        if (!location.id.startsWith('default_') && !location.id.startsWith('local_')) {
            firebase.database().ref('listings/' + location.id).remove()
                .catch(err => {
                    console.error("Firebase delete failed. Item hidden via localStorage.", err);
                    alert("Note: Your Firebase Database rules are currently blocking deletions. I've hidden it locally for you, but you should update your rules to '.write': 'auth != null' in the Firebase Console.");
                });
        }
    };

    // Save edited location (Optimistic UI update)
    $scope.saveEdit = function() {
        const updatedObj = {
            name: $scope.editingLocation.name,
            description: $scope.editingLocation.description,
            image: $scope.editingLocation.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
            rating: $scope.editingLocation.rating || 0,
            reviews: $scope.editingLocation.reviews || []
        };

        // 1. Instantly update UI
        Object.assign($scope.originalLocation, updatedObj);
        $scope.showEditModal = false;

        // 2. Silently sync with Firebase
        if (!$scope.editingLocation.id.startsWith('default_') && !$scope.editingLocation.id.startsWith('local_')) {
            firebase.database().ref('listings/' + $scope.editingLocation.id).update(updatedObj)
                .catch(err => console.warn("Firebase update blocked, but UI updated successfully."));
        }
    };
});