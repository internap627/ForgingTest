<template>
<div class='LoginGroup'>
    <h1>Login</h1>
    <div class="userwrapper"><input id='username' type="text" name="username" v-model="input.username" placeholder="Username" /></div>
    <Password v-model="input.password" @score="showScore"
      @feedback="showFeedback"/>
    <button type="button" v-on:click="login()">Login</button>
    <br/>
    <div><strong>{{ this.error.message }} </strong></div>
</div>
</template>

<script>
  import Password from 'vue-password-strength-meter'
  export default {
    name: 'LoginForm',
    components: { Password },
    data() {
        return {
            input: {
                    username: "",
                    password: ""
                },
            error: {
              score: 0,
              message: ""
            }
        }
    },
    methods: {
              login() {
                if(!this.input.username || !this.input.password) {
                  this.error.message = "A username and password must be present"
                }

                else if(this.input.username != "" && this.input.password != "") {
                    if(this.error.score < 3 ) {
                      this.error.message = "Please consider using a stronger password"
                      return
                    }
                    if(this.input.username && this.input.password) {
                      const dataString = `email=${this.input.username}&password=${this.input.password}`;
                      fetch('https://api.forgingblock.io/register', {
                        method: 'post',
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                        body: dataString
                      }).then(function(response) {
                        return response.json();
                      }).then((data) => {
                        this.error.message = data.error ? data.error : data.success
                      });
                    }
                }
            },
            showFeedback ({suggestions, warning}) {
              // eslint-disable-next-line
              console.log('🙏', suggestions)
              // eslint-disable-next-line
              console.log('⚠', warning)
            },
            showScore (score) {
              this.error.score = score
            }
        }
  }
</script>

<style scoped>
.LoginGroup > * {
  margin-bottom: 10px;
}
.userwrapper {
  max-width: 400px;
  margin: 10px auto;
}
#username {
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 13px;
  width: 100%;
}
button {
  background-color: #f1f1f1;
  padding: .5rem 1.25rem;
  font-weight: 500;
  border: 2px solid transparent;
  border-radius: 2.125rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
  outline: none;
  cursor: pointer;
}
</style>