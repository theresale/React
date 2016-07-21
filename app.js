var Quote = React.createClass({
    render: function(){
        var randomIndex = Math.floor(Math.random() * quotes.length);
        return (
            <div>
            <h3>Quote of the day:</h3>  
            <p> {this.props.quotes[randomIndex]}</p>
            </div>
        )
    }
});

var quotes = [
        "I wish we lived in a world that was safe for everything to live in the global scope. - Demetria Smith",
        "I appreciate the slow walk but I really don't know what I'm doing right now. - Unknown",
        "Friday we reach the mountain peak. Monday we get pushed back down the mountain. -Magnesium",
        "I wish every day could be Rose-Day. - Magnesium",
        "(Watching student drowning) You're doing great! - Ben :)"
    ];

ReactDOM.render(<Quote quotes={quotes}/>, document.getElementById('quote'));

var WorldClocks = React.createClass({
    handleLocationChange: function(e){
        this.setState({location: e.target.value});
    },
    render: function(){
        return (
            <div>
                <h3>World Clocks</h3>
                <form>
                    <input type="text" placeholder="Enter City" onChange={this.handleLocationChange} />
                    <input onClick={this.handleBtn} type="button" value="Add Clock"/>
                </form>
            </div>
        )
    },
    handleBtn: function() {
        ReactDOM.render(<p>{this.state.location}</p>, document.getElementById("newDiv"));
        getLatLongFromCity(this.state.location, getTimeZone); 
    }
});

ReactDOM.render(<WorldClocks/>, document.getElementById('clocks'));

function getLatLongFromCity(locationName,callback){
   console.log(locationName);
   var url = "http://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&sensor=false";
   $.getJSON(url, function(results){
       var latitude=results.results[0].geometry.location.lat;
       var longitude=results.results[0].geometry.location.lng;
       callback(latitude,longitude);
       });
}

function getTimeZone(latitude,longitude){
   var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longitude+"&timestamp=1458000000&key=AIzaSyBJjJRMptXqWwj8RmhUWc7JaenD4gdqfhc";
   $.getJSON(url, function(results){
       console.log(results);
       var offset = (results.dstOffset + results.rawOffset+18000) * 1000;
       var d = new Date();
       var utcNow = d.getTime();
       var time = new Date(utcNow+offset);
       console.log(time);
       });
}
