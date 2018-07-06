Vue.component('resume', {
  props: ['resume'],
  template: `
    <div class="resume">
      <section class="profile">
        <h1>{{resume.name}}</h1>
        <p class="job">{{resume.brief}}</p>
      </section>
      <section class="contacts">
        <div class="sectionTitle">
          <h2>联系</h2>
          <p>Contact Information</p>
        </div>
        <ul>
          <li v-for="contact in resume.contacts">
            <i class="iconfont" v-bind:class="contact.iconClass"></i><span v-if="contact.iconClass!=='icon-github'&&contact.iconClass!=='icon-blog'">{{contact.info}}</span>
            <a v-if="contact.iconClass==='icon-github'||contact.iconClass==='icon-blog'" v-bind:href="contact.info">{{contact.info}}</a>
          </li>
        </ul>
      </section>
      <section class="skills">
        <div class="sectionTitle">
          <h2>技能</h2>
          <p>Professional Skills</p>
        </div>
        <ul>
          <li v-for="skill,index in resume.skills">
            <p class="name">{{skill.name}}</p>
            <p class="description">{{skill.description}}</p>
          </li>
        </ul>
      </section>
      <section class="projects special">
        <div class="sectionTitle">
          <h2>作品</h2>
          <p>Portfolio Show</p>
        </div>
        <ol>
          <li v-for="project,index in resume.projects">
            <header>
              <p class="name">{{project.name}}</p>
              <p class="keywords">{{project.keywords}}</p>
            </header>
            <p class="link"><a v-bind:href="project.link">{{project.link}}</a></p>
            <p class="description">{{project.description}}</p>
          </li>
        </ol>
      </section>
    </div>
  `,
})
