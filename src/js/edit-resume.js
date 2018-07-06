Vue.component('edit-resume', {
  props: ['resume'],
  template: `
      <div class="editResume">
        <section class="editProfile">
          <div class="editRow"><span>姓名</span><input type="text" v-model="resume.name"></div>
          <div class="editRow"><span>简介</span><input type="text" v-model="resume.brief" placeholder="男 | 1993-3-3 | xxx学校 | xxx专业..."></div>
        </section>
        <section class="editContacts">
          <div class="sectionTitle">
            <h2>联系</h2>
            <p>Contact Information</p>
          </div>
          <ul>
            <li v-for="contact in resume.contacts">
              <div class="editRow">
                <span>{{contact.editName}}</span><input type="text" v-model="contact.info">
              </div>
            </li>
          </ul>
        </section>
        <section class="editSkills">
          <div class="sectionTitle">
            <h2>技能</h2>
            <p>Professional Skills</p>
          </div>
          <ul>
            <li v-for="skill,index in resume.skills">             
              <div class="name"><div class="editRow"><span>技能</span><input type="text" v-model="skill.name"></div></div>
              <div class="description"><div class="editBigRow"><span>描述</span><textarea rows="6" v-model="skill.description"></textarea></div></div>
              <span class="removeSkill" v-if="index >= 1" @click="$emit('remove-skill', index)">×</span>
            </li>
          </ul>
          <button class="addSkill" @click="$emit('add-skill')">添加技能</button>
        </section>
        <section class="editProjects">
          <div class="sectionTitle">
            <h2>作品</h2>
            <p>Portfolio Show</p>
          </div>
          <ol>
            <li v-for="project,index in resume.projects">
              <header>
                <div class="name "><div class="editRow"><span>作品</span><input type="text" v-model="project.name"></div></div>
                <div class="link"><div class="editRow"><span>链接</span><input type="text" v-model="project.link"></div></div>
                <div class="keywords"><div class="editRow"><span>技术栈</span><input type="text" v-model="project.keywords"></div></div>
              </header>
              <div class="description"><div class="editBigRow"><span>描述</span><textarea rows="6" v-model="project.description"></textarea></div></div>
              <span class="removeProject" v-if="index >= 1" @click="$emit('remove-project', index)">×</span>
            </li>
          </ol>
          <button class="addProject" @click="$emit('add-project')">添加作品</button>
        </section>
      </div>
  `
})