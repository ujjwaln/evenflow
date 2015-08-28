(function(d3) {

   var delay_factor = 1;

   var v0 = 25.1; //initial speed in m/s
   var g = 9.8; //accelertion due to gravity
   var th = (30 * Math.PI / 180); //initial angle (anticlockwise from horizontal in radians)
   var t_flight = 2 * v0 * Math.sin(th) / g;
   var x_distance = 2 * t_flight * v0 * Math.cos(th); //width in meters
   var y_distance = v0 * Math.sin(th) * (t_flight/2) - g * (t_flight/2) * (t_flight/2) / 2; //height in meters

   console.log(x_distance, y_distance);

   var t0 = 0; //animation start time in seconds
   var dt = 0.01; //animation time step seconds
   var y0 = x_distance * 0.1;
   var x0 = 0;

   var win_width = 900;
   var win_height = 450;

   var node = d3.select("#content")
                .style({width: String(win_width) + "px", height: String(win_height) + "px"});

   var svg = node
            .append("svg")
            .attr("width", win_width)
            .attr("height", win_height)
            .style("fill", "white");

   //var scale = Math.min(win_height/y_distance, win_width/x_distance);
   var scale = win_width / x_distance;
   //var scale = win_height / y_distance;

   var px_0 = x0 * scale;
   var py_0 = win_height - y0 * scale;

   var circle = svg.append("circle")
                .attr("cx", px_0)
                .attr("cy", py_0)
                .attr("r", 5)
                .style("fill", "steelblue");

   var step = 0;
   d3.timer(projectile, dt * 1000);

   function projectile() {
        var x = x0 + v0 * Math.cos(th) * dt * step / delay_factor;
        var y = y0 + v0 * Math.sin(th) * dt * step / delay_factor - g * Math.pow(dt * step / delay_factor, 2) * 0.5;

        var px_x = parseInt(x * scale);
        var px_y = parseInt(win_height - y * scale);

        circle.attr("cx", px_x).attr("cy", px_y);

        console.log(step, x, y, px_x, px_y);
        step ++;

        if (x > x_distance) {
            //circle.remove();
            return true;
        }

        return false;

   }

})(window.d3);
