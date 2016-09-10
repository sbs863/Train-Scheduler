  //firebase info and init
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyB-sCYCH0ldgEzldjbcHBYY8KukfBjk_Zg",
      authDomain: "shining-time-station.firebaseapp.com",
      databaseURL: "https://shining-time-station.firebaseio.com",
      storageBucket: "shining-time-station.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(document).ready(function() {


      $('button').on('click', function(e) {

          console.log('buttonworks');

          //creates an object containing all the data entered on the submission form
          var data = {
              name: $('.name').val().trim(),
              destination: $('.destination').val().trim(),
              departure: $('.departure').val().trim(),
              frequency: $('.frequency').val().trim(),


              dateAdded: firebase.database.ServerValue.TIMESTAMP
          };

          //push the object data to firebase
          database.ref().push(data);
          e.preventDefault();
          // e.stopPropagation();
      });

  });
  //defines the firebase database function as the variable ref. This will allow us to pull the data from firebase. 
  var ref = database.ref();
  //when a new data is added to the firebase database this will run the snapshot function
  ref.on("child_added", function(snapshot) {
      //defines a variable to store the value of the snapshot function
      var newPost = snapshot.val();
      //create a new row with the columns containing the snapshot data

      var departureConv = moment(newPost.departure, "hh:mm").subtract(1, "years");
      console.log(departureConv);
      var diffTime = moment().diff(moment(departureConv), "minutes");
      console.log(diffTime);
      var tRemainder = diffTime % newPost.frequency;
      console.log(tRemainder);
      var minutesAway = newPost.frequency - tRemainder;
      console.log(minutesAway);
      var nextA = moment().add(minutesAway, "minutes").format('LT');

      console.log(nextA);


      var newRow = $('<tr>')
          .append('<td valign="top">' + newPost.name + '</td>')
          .append('<td valign="top">' + newPost.destination + '</td>')
          .append('<td valign="top">' + newPost.frequency + '</td>')
          .append('<td valign="top">' + nextA + '</td>')
          .append('<td valign="top">' + minutesAway + '</td>');
      //adds data to a new row of the table in the HTML
      $('table').append(newRow);
  });
