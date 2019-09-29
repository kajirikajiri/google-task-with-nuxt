<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        app
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
        <button @click="execute()">execute</button>
        <button @click="signin()">in</button>
        <button @click="signout()">out</button>
        <button @click="nowStatus()">check</button>
        <div v-for="(item, i) in list" :key="i">
            {{ item.header }}
          <li v-for="(task, ii) in item.tasks" :key="ii">
            <!-- {{task}} -->
            {{task.title}}
            {{ task.position }}
            {{ task.updated}}
            {{task.notes}}
            {{task.status}}
          </li>
        </div>
        <!-- {{ this.status }} -->
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
// import {google} from 'googleapis'
import fs from 'fs'

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    try {
      gapi.load('client:auth2', this.initClient()); // これのおかげで、最初からgapiが使える
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async gapiInit(){
      gapi.client.init({
        apiKey: 'AIzaSyAU3DJEHQa62-gVE24F2mmvmfutW8M0OXs',
        clientId: '951188458290-nl1vl4d0evp017sh8ae2q3cmrlnbm9nq.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
        scope: "https://www.googleapis.com/auth/tasks.readonly"
      })
    },
    async nowStatus() {
      this.gapiInit()
      const a = gapi.auth2.getAuthInstance().isSignedIn.get()
      console.log(a)
    },
    async execute(){
      gapi.load('client:auth2', this.initClient());
    },
    async initClient() {
      this.gapiInit()
      const result = await gapi.auth2.getAuthInstance().isSignedIn.get()
      await this.updateSigninStatus(result)
    },
    async signout() {
      const signoutButton = await document.getElementById('signout_button');
      try {
        isSignedIn = await this.handleSignoutClick()
      } catch (e) {
        console.log(e)
      }
    },
    async signin() {
      const authorizeButton = await document.getElementById('authorize_button');
      try {
        isSignedIn = await this.handleAuthClick()
      } catch (e) {
        console.log(e)
      }
    },
    async updateSigninStatus(isSignedIn) {
      let signoutButton = {}
      let authorizeButton = {}
      if (isSignedIn) {
        try {
          authorizeButton.style.display = 'none'
        } catch (e) {
          console.log(e)
        }
        try {
          signoutButton.style.display = 'block';
        } catch (e) {
          console.log(e)
        }
        await this.listTaskLists();
      } else {
        try {
          authorizeButton.style.display = 'block'
        } catch (e) {
          console.log(e)
        }
        try {
          signoutButton.style.display = 'none';
        } catch (e) {
          console.log(e)
        }
      }
    },
    handleAuthClick() {
      gapi.auth2.getAuthInstance().signIn();
    },
    handleSignoutClick() {
      gapi.auth2.getAuthInstance().signOut();
    },
    async listTaskLists() {
      const resL = await gapi.client.tasks.tasklists.list()
      console.log('Task Lists:');
      const taskLists = resL.result.items;
      if (taskLists && taskLists.length > 0) {
        let taskList = ""
        let tasks = []
        for (let i = 0; i < taskLists.length; i++) {
          tasks = []
          taskList = taskLists[i];
          const rT = await gapi.client.tasks.tasks.list({tasklist: taskList.id})
          const rTasks = rT.result.items;
          if (rTasks && rTasks.length > 0) {
            for (let i2 = 0; i2 < rTasks.length; i2++) {
              const taskList2 = rTasks[i2];
              tasks.push(taskList2)
            }
          } else {
            console.log('No task lists found.');
          }
          this.list.push({
            header: taskList.title,
            tasks
          })
        }
      } else {
        console.log('No task found.');
      }
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

