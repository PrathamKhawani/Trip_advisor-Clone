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
            const dataCount = data ? Object.keys(data).length : 0;
            
            // If the database is empty or only has the old 3 items, auto-seed the 10 new locations.
            if (dataCount < 5) {
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
                
                if ($rootScope.user) {
                    firebase.database().ref('listings').remove().then(() => {
                        defaultListings.forEach(item => {
                            firebase.database().ref('listings').push(item);
                        });
                        $timeout(loadLocations, 1500);
                    });
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

    // (Seed Data function removed as seeding is now fully automated)

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