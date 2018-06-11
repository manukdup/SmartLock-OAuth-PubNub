var pubnub = new PubNub({
    subscribeKey: 'sub-c-a1ad7926-5e0a-11e8-8ebf-f686a6d93a6b',
    publishKey: 'pub-c-563cbabc-a399-4a76-830a-468a698efd4d'
});

pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                //publishSampleMessage();
            }
        },
        message: function(msg) {
            console.log(msg.message);
            pubnub.setAuthKey(msg.message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })      
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['Raspberry'] 
    });

function unlock() {
pubnub.publish({
    message: 'Unlock',
    channel: 'RP'
}, 
function (status, response) {
    if (status.error) {
    	var elems = document.getElementsByClassName('warning');
		for (var i = 0;i < elems.length;i += 1){
  			elems[i].style.display = 'block';
		}
		document.getElementsByClassName("btn").value = "Try Again";
        // handle error
        console.log(status);
    } else {
    	document.getElementById('lockImage').src = 'Unlock.png';
        console.log("Message Published w/ timetoken", response.timetoken);
    }
});
}


