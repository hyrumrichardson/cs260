var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    search: 'the martian',
    show: 'all',
    drag: {},
    selecting: false,
    searchResults: [],
    showlist: false,
    loginerror: '',
    usernamefield: 'hyrum',
    passwordfield: 'hi',
    displayedUser: '',
  },
  created: function() {
  },
  computed: {
    activemovies: function() {
      // if (this.movies.length > 0) {
      //   return this.movies.filter(function(item) {
	    //      return !item.completed;
      // });
      // }
      // else {
      //   return [];
      // }
        return this.movies.filter(function(item) {
           return item.completed !== "seen";
      });
    },
    checked: function() {
      console.log("here");
      return 0;
    },
  },
  methods: {
    isCompleted: function(item) {
      console.log("isCompleted");
      this.currentItem = item;
    },
    register: function() {
      console.log("register");
      axios.post("/api/users",{username: this.usernamefield, password: this.passwordfield}).then(response => {
        this.displayedUser = response.data.user;
        this.showlist = true;
        this.getItems();
      }).catch(error => {
	      if (error.response) {
	          if (error.response.status === 403)
	           this.loginerror = "That username already has an account.";
	          else if (error.response.status === 409)
	           this.loginerror = "That user name is already taken.";
	        return;
	      }
	       this.loginerror = "Sorry, your request failed. We will look into it.";
      });
    },
    login: function() {
      console.log("login");
      axios.post("/api/login",{username: this.usernamefield, password: this.passwordfield}).then(response => {
      	this.displayedUser = response.data.user;
        this.showlist = true;
        this.getItems();
      }).catch(error => {
	      if (error.response) {
	          if (error.response.status === 403 || error.response.status === 400)
	           this.loginerror = "Invalid login.";
	      return;
	      }
	       this.loginerror = "Sorry, your request failed. We will look into it.";
       });
    },
    getItems: function() {
      console.log("get");
      axios.get("/api/users/" + this.displayedUser.id + "/movies").then(response => {
	      this.movies = response.data.movies;
        console.log(this.movies);
	      return true;
      }).catch(err => {

      });
    },
    searchMovies: function() {
      console.log("search");
      var self = this;
      findMovie(function(cb) {
        self.searchResults = cb.slice(0,5)
      });

      this.selecting = true;
      console.log(this.searchResults);
    },
    addItem: function(jsonitem) {
      console.log("add");
      this.selecting = false;
      item = {title: jsonitem.Title, poster: jsonitem.Poster};
      axios.post("/api/users/" + this.displayedUser.id + "/movies", item).then(response => {
        console.log(response.data.item);
        console.log("here");
	      this.getItems();
	      return true;
      }).catch(err => {
      });
    },
    imageLink: function (poster) {
      return poster;
    },
    completeItem: function(item) {
      axios.put("/api/movies/" + item.id, {completed: this.switchSeen(item.completed)}).then(response => {
        console.log("complete");
        console.log(response.data.item);
	      this.getItems();
	      return true;
      }).catch(err => {
      });
    },
    switchSeen: function(seen) {
      if (seen == "seen") {
        return "not seen";
      }
      else {
        return "seen"
      }
    },
    deleteItem: function(item) {
      axios.delete("/api/movies/" + item.id).then(response => {
	       this.getItems();
	       return true;
      }).catch(err => {
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      var indexItem = this.movies.indexOf(this.drag);
      var indexTarget = this.movies.indexOf(item);
      this.movies.splice(indexItem,1);
      this.movies.splice(indexTarget,0,this.drag);
    },
  }
});

function findMovie(callback) {
  console.log("find");
  var search = document.getElementById("search_param").value;
  var myurl= "http://www.omdbapi.com/?apikey=69fb9068&s=" + search;
  var b;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      console.log(json);
      //console.log(json.Search)

      callback(json.Search);
    }
  });
}
