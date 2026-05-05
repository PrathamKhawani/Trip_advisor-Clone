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
        .when('/listings', {
            template: `
                <div>
                    <button class="add-btn" ng-click="showAddModal=true" title="Add Destination" ng-if="user">+</button>
                    <div ng-show="showAddModal" class="modal-bg">
                        <div class="modal" style="position:relative;">
                            <span class="close-modal" ng-click="showAddModal=false">&times;</span>
                            <h2>Add Destination</h2>
                            <form ng-submit="addLocation()">
                                <input type="text" ng-model="newLocation.name" placeholder="Destination Name" required>
                                <input type="text" ng-model="newLocation.description" placeholder="Description" required>
                                <input type="text" ng-model="newLocation.image" placeholder="Image URL (optional)">
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                    <div class="location-list">
                        <div class="location-card" ng-repeat="location in locations">
                            <img ng-if="location.image" ng-src="{{location.image}}" alt="{{location.name}}">
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
            template: `<h2>About</h2><p>TripAdvisor Clone Project</p>`
        })
        .otherwise({
            redirectTo: '/listings'
        });
});

app.run(function($rootScope) {
    $rootScope.user = null;
    firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.user = user;
        $rootScope.$applyAsync();
    });
});

app.controller('AuthController', function($scope, $rootScope) {
    $scope.login = function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            console.error("Login failed", error);
            alert("Login failed: " + error.message);
        });
    };
    $scope.logout = function() {
        firebase.auth().signOut();
    };
});

app.controller('ListingsController', function($scope, $timeout) {
    $scope.locations = [];
    $scope.newLocation = {};
    $scope.showAddModal = false;

    // Fetch listings from Firebase
    function loadLocations() {
        firebase.database().ref('listings').once('value').then(function(snapshot) {
            const data = snapshot.val() || {};
            $scope.locations = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            $scope.$apply();
        });
    }
    loadLocations();

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