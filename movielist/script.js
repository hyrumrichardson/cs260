var app = new Vue({
  el: '#app',
  data: {
    todos: [],
    search: '',
    show: 'all',
    drag: {},
    selecting: false,
    searchResults: [],
  },
  computed: {
    activeTodos: function() {
      return this.todos.filter(function(item) {
	       return !item.completed;
      });
    },
    filteredTodos: function() {
      if (this.show === 'active')
	return this.todos.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	     return this.todos.filter(function(item) {
	        return item.completed;
	     });
      return this.todos;
    },
    /*searchResults: function() {
      console.log(2);
      console.log(this.results);
      console.log(this.selecting);

      return this.results;
    },*/
  },
  methods: {
    searchMovies: function() {
      var self = this;
      findMovie(function(cb) {
        self.searchResults = cb.slice(0,5)
      });

      this.selecting = true;
    },
    addItem: function(item) {
      console.log(item);
      item.completed = false;
      this.selecting = false;
      this.todos.push(item);
    },
    imageLink: function (item) {
      console.log(item.Poster);
      return item.Poster;
    },
    completeItem: function(todo) {
      todo.completed = !todo.completed;
    },
    deleteItem: function(item) {
      var index = this.todos.indexOf(item);
      if (index > -1)
	    this.todos.splice(index,1);
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showCompleted: function() {
      this.show = 'completed';
    },
    deleteCompleted: function() {
      this.todos = this.todos.filter(function(item) {
	       return !item.completed;
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      var indexItem = this.todos.indexOf(this.drag);
      var indexTarget = this.todos.indexOf(item);
      this.todos.splice(indexItem,1);
      this.todos.splice(indexTarget,0,this.drag);
    },
  }
});

function findMovie(callback) {
  var search = document.getElementById("search_param").value;
  var myurl= "http://www.omdbapi.com/?apikey=69fb9068&s=" + search;
  var b;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      //console.log(json);
      //console.log(json.Search)

      callback(json.Search);
    }
  });
}
