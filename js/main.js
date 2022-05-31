$(document).ready(function(){
 $('#searchUser').on('keyup', function(e){
    let username = e.target.value;


    //Make request to Github

    $.ajax({
        url : 'https://api.github.com/users/'+username,
        data : {
            client_id: '6f17b46709e84163155a',
            client_secret: 'a7f0d2f05b88c175b5765cb1ab90eb2d28b7e8ba'
        }

    }).done(function(user){
        $.ajax({
            url : 'https://api.github.com/users/'+username+ '/repos',
            data : {
                client_id: '6f17b46709e84163155a',
                client_secret: 'a7f0d2f05b88c175b5765cb1ab90eb2d28b7e8ba',
                sort: 'created: asc',
                per_page: 5
            }
        }).done(function(repos){

            $.each(repos, function(index, repo){
                $('#repos').append(`
                <div class="card card-body bg-light">
                <div class="row">
                <div class="col-md-6">
                <strong>${repo.name}</strong> <br>${repo.description}
                </div>
                <div class="col-md-4">
                <span class="label label-default" style="background-color: Green; color: white; padding: 8px;font-family: Arial; " >Forks: ${repo.forks_count}</span>
              <span class="label label-primary" style="background-color: Blue; color: white; padding: 8px;font-family: Arial;" >Watchers: ${repo.watchers_count}</span>
              <span class="label label-success" style="background-color: Orange;color: white; padding: 8px;font-family: Arial; " >Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" type=button class="btn btn-info" >Repo Page</a>
                </div>

                </div>
                </div>
                ` );
            });

        });
        $('#profile').html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          </div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="label label-default" style="background-color: Green; color: white; padding: 8px;font-family: Arial; " >Public Repos: ${user.public_repos}</span>
              <span class="label label-primary" style="background-color: Blue; color: white; padding: 8px;font-family: Arial;" >Public Gists: ${user.public_gists}</span>
              <span class="label label-success" style="background-color: Orange;color: white; padding: 8px;font-family: Arial; " >Followers: ${user.followers}</span>
              <span class="label label-success" style="background-color: Red;" color: white; padding: 8px;font-family: Arial; >Following: ${user.following}</span>
              <br><br>
            
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `);
    });
 });
});