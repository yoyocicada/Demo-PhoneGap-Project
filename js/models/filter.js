//TODO: IN PROGRESS
define([
    'jquery',
    'underscore',
    'Backbone',
    'collections/restaurantResultList',
    'models/restaurant'
    ],function($,_,Backbone,restaurantResultList,restaurant){
    var filterModel = Backbone.Model.extend({
        defaults:{
            price_min:0,
            price_max:100,
            age:40,
            Location:70,
            
            numRemoteResults: 0,
            numLocalResults: 0,
            numPages: 0,
            numLoadedPages: 0,
            fullLoad: false,
            filteredFullLoad: false,
            remoteFilter: false,
            collection: {}
        },
        cache: [],
        xhr:{},
        longtitude: 0,
        latitude: 0,
        query: "",
        searchResultsView: {},
        initialize: function(){
            //this.numRemoteResults = this.options.numRemoteResults;
            //this.numLocalResults = this.options.numLocalResults;
            //this.numPages = this.options.numPages;
            //this.numLoadedPages = this.options.numLoadedPages;
            //this.fullLoad = this.options.fullLoad;
            //this.filteredFullLoad = this.options.filteredFullLoad;
            //this.remoteFilter = this.options.remoteFilter;
            
            //initialized collection.
            
            this.set({'collection': App.Collections.restaurantCollection});
        },
        reset: function() {
            
        },
        findBy: function (query, longitude, latitude){
            this.set({"longitude": longitude});
            this.set({"latitude":latitude});
            this.set({"query": query});
            this.getFromAjax(query, longitude, latitude);
            //console.log("trigger view rendering", query, longitude,latitude);
            this.trigger("find");
        },
        sortBy: function(sortType){
            //console.log("sort by sort by la");
            var collection = this.get("collection");
            //console.log(App.Collections.restaurantCollection.toJSON());
            App.Collections.restaurantCollection.comparator = function(item){
                return item.get(sortType);
            };
            App.Collections.restaurantCollection.sort();
            //console.log(App.Collections.restaurantCollection.toJSON());
            /*
            if(this.get("fullLoad") ===true && this.get("remoteFilter")===false){
                //local sort on unfiltered collection.
                console.log("local sort on unfiltered collection");
            } else if(this.get("filteredFullLoad")===true && this.get("remoteFilter") ===true){
                //local sort on filtered collection.
                console.log("local sort on filtered collection");
            } else {
                //remote sort
                console.log("remote sort");
            }
            */
        },
        filterBy: function(params){
            if(this.get("fullLoad")===true && this.get("remoteFilter")===false){
                //local filter on unfiltered collection.
                //console.log("filter with local filter");
            } else if(this.get("fullLoad") ===false){
                //remote filter
                this.remoteFilter = true;
                //this.getFromAjax(params);
                //console.log("filter with remote filter");
            }
        },
        getFromAjax: function(query, setting){

            

            //response will reset numRemotResult and numPages.
            //insert model into collection

            /* the following code needs to be changed.
            if(this.xhr!={}){
                this.xhr.abort();
            }
            this.xhr = $.ajax({
                url: "api/search",
                data: {query: query, setting: setting},
                dataType: "json"
            }).done(function(data){
                
            });*/
        },
        nextPage: function(){
            /*
            this.fullLoad = (this.numPages === this.numLoadedPages)? true : false;
            if(this.fullLoad){
                return false;
            } else {
                this.numLoadedPages++;
                var query = "page="+this.numLoadedPages;
                this.getFromAjax(query);
            }
            */
        },
        resetLocalCounter: function(){
            /*
            this.numLoadedPages = 0;
            this.fullLoad = false;
            */
        }
    });
    
    return filterModel;
});