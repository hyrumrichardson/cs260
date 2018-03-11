var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'all',
    drag: {},
	  select: '',
  },
  created: function() {
    this.getItems();
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
	return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	return this.items.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	return this.items.filter(function(item) {
	  return item.completed;
	});
      return this.items;
    },
  },
  methods: {
	getItems: function() {
      axios.get("/api/items").then(response => {
		    this.items = response.data;
		    return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      axios.post("/api/items", {
			text: this.text,
			completed: false,
			priority: this.select,
		}).then(response => {
			this.text = "";
			this.getItems();
			return true;
		}).catch(err => {
		});
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
		      text: item.text,
		      completed: !item.completed,
		      priority: item.priority,
		      orderChange: false,
      }).then(response => {
		      return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
		    this.getItems();
		    return true;
      }).catch(err => {
      });
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
      this.items.forEach(item => {
		if (item.completed)
	  this.deleteItem(item)
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
		      text: this.drag.text,
          completed: this.drag.completed,
	        priority: this.drag.priority,
	        orderChange: true,
          orderTarget: item.id
      }).then(response => {
		      this.getItems();
		      return true;
      }).catch(err => {
      });
    },
    lowerPriority: function(item) {
      var newPriority = item.priority - 1;
      if (newPriority < 1) {newPriority = 1; return;}
      axios.put("/api/items/" + item.id, {
		      text: item.text,
		      completed: item.completed,
		      priority: newPriority,
		      orderChange: false,
      }).then(response => {
        this.getItems();
		      return true;
      }).catch(err => {
      });
    },
    raisePriority: function(item) {
      var newPriority = item.priority + 1;
      if (newPriority > 3) {newPriority = 3; return;}
      axios.put("/api/items/" + item.id, {
		      text: item.text,
		      completed: item.completed,
		      priority: newPriority,
		      orderChange: false,
      }).then(response => {
        this.getItems();
		      return true;
      }).catch(err => {
      });
    },
    sortPriority: function(item) {
      this.getItems();
      var itemIDs = [];
      // this.items.forEach(function(item) {
      //   itemIDs.push(item.id);
      // });
      // console.log(itemIDs);
      this.items.sort(function(a,b) {
        return a.priority - b.priority;
      });
    }
  }
});
