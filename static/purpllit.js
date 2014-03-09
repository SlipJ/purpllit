
(function (Purpllit, $) {

    Purpllit.username = "Purple User";
    var data_list = [
        {
        "title":"Check out this crazy commercial",
        "link":"http://www.youtube.com/watch?v=UURgWOMLESY",
        "votes": 45,
        "datetime":"March 01, 2013. 21:22:00",
        "username":"Purple User",
        "voted": 0,
        "voted_up": 0
        },
        {
        "title":"Check out another crazy commercial",
        "link":"http://www.youtube.com/watch?v=UURgWOMLESY",
        "votes":15,
        "datetime":"June 01, 2013. 21:22:00",
        "username":"someone else",
        "voted": 0,
        "voted_up": 0
    }];

    Purpllit.vote = function voteFunc(id, vote)
    {
        var votes = document.getElementById("votes_" + id)
        var buttons = document.getElementsByClassName("button_" + id)

        //button not clicked yet
        if(!($(buttons[0]).hasClass("active") || $(buttons[1]).hasClass("active")))
        {
            if(vote == 1){
                $(buttons[0]).addClass("active");
                buttons[1].setAttribute("disabled", "")
                data_list[id].voted_up = 1;
            }
            else{
                $(buttons[1]).addClass("active");
                buttons[0].setAttribute("disabled", "")
            }
            votes.innerText = parseInt(votes.innerText || 0) + parseInt(vote);
            data_list[id].votes += parseInt(vote);
            data_list[id].voted = 1;
        }
        //button already clicked
        else {
            if($(buttons[0]).hasClass("active")){
                $(buttons[0]).removeClass("active");
                buttons[1].removeAttribute("disabled")

            }
            else {
                $(buttons[1]).removeClass("active");
                buttons[0].removeAttribute("disabled")
            }
            votes.innerText = parseInt(votes.innerText) - parseInt(vote);
            data_list[id].votes -= parseInt(vote);
            data_list[id].voted = 0;
            data_list[id].voted_up = 0;
        }
    };


    Purpllit.addLink = function addLink(form)
    {
        var d = new Date()

        var newLink = {
            title:form.new_title.value,
            link:form.new_link.value,
            votes:0,
            datetime: d.toLocaleString(),
            username:Purpllit.username,
            voted: 0,
            voted_up: 0
        };
        data_list.push(newLink)
        var ordered_data = data_list.sort(postOrderCompare)
        $("#links-list").html(tmpl("item_tmpl", {'data_list': ordered_data}));
        $("#new_link_form")[0].reset();
    };


    Purpllit.changeUsername = function changeUsername(form){
        var newUsername = form.new_username.value;
        if (!/^\w+$/.test(newUsername)){
            alert("Only alphanumerical characters allowed");
            return
        }
        var oldUsername = document.getElementById("username").innerText;
        var usernames = document.getElementsByClassName("username");
        for (var i=0; i< usernames.length; i++){
            if (usernames[i].innerText == oldUsername){
                usernames[i].innerText = newUsername;
            }
        }
        for (var i=0; i< data_list.length; i++){
            if (data_list[i].username == oldUsername){
                data_list[i].username = newUsername;
            }
        }
        Purpllit.username = newUsername;

        $("#new_username_form")[0].reset();
        $("#change-username").toggle();
        $("#current-username").toggle();
    }

    function postOrderCompare(a, b) {
        var aDate = new Date(Date.parse(a.datetime));
        var bDate = new Date(Date.parse(b.datetime));
        if (aDate < bDate)
            return 1;
        if (Date(Date.parse(a.datetime)) > Date(Date.parse(b.datetime)))
            return -1;
        // a must be equal to
        return 0;
        }


    // Templates
    $(window).load(function(){
    (function(){
      var cache = {};

      this.tmpl = function tmpl(str, data){
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            "with(obj){p.push('" +

            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");

        return data ? fn( data ) : fn;
      };
    })();

    var ordered_data = data_list.sort(postOrderCompare)
    $("#links-list").html(tmpl("item_tmpl", {'data_list': ordered_data}));

    });
    // End Templates

    $().ready(function () {
        $("#head-title").click(function () {
            $("#subtitle").toggle();
        });
        $("#current-username").click(function () {
            $("#change-username").toggle();
            $("#current-username").toggle();
        });
    });

    $("form").on("submit", function (event) {
        event.preventDefault();
    });

}(window.Purpllit = window.Purpllit || {}, jQuery));



