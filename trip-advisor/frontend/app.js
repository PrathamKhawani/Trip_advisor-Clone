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
                        <button class="btn-secondary" ng-click="seedData()" ng-if="user" style="font-size: 0.9rem;">Seed Default Data</button>
                    </div>
                    <button class="add-btn" ng-click="showAddModal=true" title="Add Destination" ng-if="user">+</button>
                    <div ng-show="showAddModal" class="modal-bg">
                        <div class="modal" style="position:relative;">
                            <span class="close-modal" ng-click="showAddModal=false">&times;</span>
                            <h2>Add Destination</h2>
                            <form ng-submit="addLocation()">
                                <input type="text" ng-model="newLocation.name" placeholder="Destination Name" required>
                                <input type="text" ng-model="newLocation.description" placeholder="Description" required>
                                <input type="text" ng-model="newLocation.image" placeholder="Image URL (optional)">
                                <button type="submit">Add Location</button>
                            </form>
                        </div>
                    </div>
                    <div class="location-list">
                        <div class="location-card" ng-repeat="location in locations">
                            <div class="card-image-wrapper">
                                <img ng-if="location.image" ng-src="{{location.image}}" alt="{{location.name}}">
                            </div>
                            <div class="location-card-content">
                                <h3>{{location.name}}</h3>
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

app.controller('ListingsController', function($scope, $timeout) {
    $scope.locations = [];
    $scope.newLocation = {};
    $scope.showAddModal = false;

    // Fetch listings from Firebase
    function loadLocations() {
        firebase.database().ref('listings').once('value').then(function(snapshot) {
            const data = snapshot.val();
            if (!data) {
                // Database is empty, let's seed some default data!
                const defaultListings = [
                    {
                        name: "Eiffel Tower",
                        description: "A famous wrought-iron lattice tower on the Champ de Mars in Paris, France.",
                        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["Absolutely breathtaking view from the top!"]
                    },
                    {
                        name: "Colosseum",
                        description: "An oval amphitheatre in the centre of the city of Rome, Italy. A marvel of ancient engineering.",
                        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
                        rating: 4,
                        reviews: ["Incredible piece of history."]
                    },
                    {
                        name: "Santorini",
                        description: "An island in the southern Aegean Sea, famous for its dramatic views and stunning sunsets.",
                        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["The sunsets here are unmatched."]
                    },
                    {
                        name: "Kyoto",
                        description: "Once the capital of Japan, Kyoto is famous for its numerous classical Buddhist temples, gardens, and imperial palaces.",
                        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["So peaceful and culturally rich."]
                    },
                    {
                        name: "New York City",
                        description: "The global center of art, culture, fashion, and finance, home to the iconic Times Square and Statue of Liberty.",
                        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
                        rating: 4,
                        reviews: ["The city that never sleeps!"]
                    },
                    {
                        name: "Bali",
                        description: "An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
                        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["A true tropical paradise."]
                    },
                    {
                        name: "Machu Picchu",
                        description: "A 15th-century Inca citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.",
                        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["The hike was challenging but worth every step."]
                    },
                    {
                        name: "Banff National Park",
                        description: "Canada's oldest national park, encompassing 6,641 square kilometres of mountainous terrain, glaciers and ice fields.",
                        image: "https://images.unsplash.com/photo-1534067783941-51c9c2a8dc4e?auto=format&fit=crop&w=800&q=80",
                        rating: 5,
                        reviews: ["The bluest water I've ever seen."]
                    }
                ];
                
                // Only try to push if we have a user (meaning we bypassed permission denied, or rules are open)
                if ($rootScope.user) {
                    defaultListings.forEach(item => {
                        firebase.database().ref('listings').push(item);
                    });
                    $timeout(loadLocations, 1500);
                } else {
                    $scope.locations = defaultListings.map((item, index) => ({ id: 'mock_' + index, ...item }));
                    $scope.$apply();
                }
            } else {
                $scope.locations = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                $scope.$apply();
            }
        }).catch(function(error) {
            console.error("Database read failed: ", error.message);
            // If permission is denied or database read fails, fallback to local mock data
            $scope.locations = [
                {
                    id: 'mock_1',
                    name: "Eiffel Tower (Mock Data)",
                    description: "Firebase Database read failed. Displaying local mock data.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
                    rating: 5,
                    reviews: []
                }
            ];
            $scope.$apply();
        });
    }
    loadLocations();

    // Seed Data Function for the UI button
    $scope.seedData = function() {
        if (!confirm("This will overwrite your current destinations with the 8 high-quality default locations. Proceed?")) return;
        
        firebase.database().ref('listings').remove().then(() => {
            const defaultListings = [
                { name: "Eiffel Tower", description: "A famous wrought-iron lattice tower on the Champ de Mars in Paris, France.", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["Absolutely breathtaking view from the top!"] },
                { name: "Colosseum", description: "An oval amphitheatre in the centre of the city of Rome, Italy. A marvel of ancient engineering.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", rating: 4, reviews: ["Incredible piece of history."] },
                { name: "Santorini", description: "An island in the southern Aegean Sea, famous for its dramatic views and stunning sunsets.", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The sunsets here are unmatched."] },
                { name: "Kyoto", description: "Once the capital of Japan, Kyoto is famous for its numerous classical Buddhist temples, gardens, and imperial palaces.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["So peaceful and culturally rich."] },
                { name: "New York City", description: "The global center of art, culture, fashion, and finance, home to the iconic Times Square and Statue of Liberty.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", rating: 4, reviews: ["The city that never sleeps!"] },
                { name: "Bali", description: "An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["A true tropical paradise."] },
                { name: "Machu Picchu", description: "A 15th-century Inca citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The hike was challenging but worth every step."] },
                { name: "Banff National Park", description: "Canada's oldest national park, encompassing 6,641 square kilometres of mountainous terrain, glaciers and ice fields.", image: "https://images.unsplash.com/photo-1534067783941-51c9c2a8dc4e?auto=format&fit=crop&w=800&q=80", rating: 5, reviews: ["The bluest water I've ever seen."] }
            ];
            
            defaultListings.forEach(item => {
                firebase.database().ref('listings').push(item);
            });
            $timeout(loadLocations, 1500);
        }).catch(err => alert("Error writing to database: " + err.message));
    };

    // Add a new listing
    $scope.addLocation = function() {
        if ($scope.newLocation.name && $scope.newLocation.description) {
            const ref = firebase.database().ref('listings').push();
            ref.set({
                name: $scope.newLocation.name,
                description: $scope.newLocation.description,
                image: $scope.newLocation.image || '',
                rating: 0,
                reviews: []
            }).then(function() {
                $scope.showAddModal = false;
                $scope.newLocation = {};
                loadLocations();
            });
        }
    };

    // Add review, rate, delete: use similar Firebase update/remove logic
    $scope.addReview = function(location) {
        if (location.newReview) {
            const reviews = location.reviews || [];
            reviews.push(location.newReview);
            firebase.database().ref('listings/' + location.id).update({
                reviews: reviews
            }).then(function() {
                location.newReview = '';
                loadLocations();
            });
        }
    };

    $scope.rateLocation = function(location, star) {
        firebase.database().ref('listings/' + location.id).update({
            rating: star
        }).then(function() {
            loadLocations();
        });
    };
});