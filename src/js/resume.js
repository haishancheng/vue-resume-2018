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
            <i class="iconfont" v-bind:class="contact.iconClass"></i><span>{{contact.info}}</span>
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
            <!--<span class="removeSkill" v-if="index >= 1" @click="$emit('remove-skill', index)">×</span>-->
          </li>
        </ul>
        <!--<button v-on:click="addSkill">添加技能</button>-->
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
              <p class="link">{{project.link}}</p>
              <p class="keywords">{{project.keywords}}</p>
            </header>
            <p class="description">{{project.description}}</p>
          </li>
        </ol>
      </section>
    </div>
  `,
})


// Vue.component('resume',{
//   props: ['resume'],
//   template: `
//     <div class="resume">
//       <section class="profile">
//         <h1>
//           <editable-span v-bind:value="resume.name" v-on:edit="onEdit('name', $event)"></editable-span>
//         </h1>
//         <p class="job">
//           应聘职位: <editable-span v-bind:value="resume.jobTitle" v-on:edit="onEdit('jobTitle', $event)"></editable-span>
//         </p>
//         <p>
//           <editable-span v-bind:value="resume.birthday" v-on:edit="onEdit('birthday', $event)"></editable-span> |
//           <editable-span v-bind:value="resume.gender" v-on:edit="onEdit('gender', $event)"></editable-span> |
//           <editable-span v-bind:value="resume.email" v-on:edit="onEdit('email', $event)"></editable-span> |
//           <editable-span v-bind:value="resume.phone" v-on:edit="onEdit('phone', $event)"></editable-span>
//         </p>
//       </section>
//       <section class="skills">
//         <h2>技能</h2>
//         <ul>
//           <li v-for="skill,index in resume.skills">
//             <editable-span class="name" v-bind:value="skill.name" v-on:edit="onEdit('skills['+index+'].name', $event)"></editable-span>
//             <div class="description">
//               <editable-span v-bind:value="skill.description" v-on:edit="onEdit('skills['+index+'].description', $event)"></editable-span>
//             </div>
//             <span v-if="index >= 1" @click="removeSkill(index)">删除</span>
//           </li>
//         </ul>
//         <button v-on:click="addSkill">添加技能</button>
//       </section>
//       <section class="projects">
//         <h2>项目经历</h2>
//         <ol>
//           <li v-for="project,index in resume.projects">
//             <header class="clearfix">
//               <h3 class="name">
//                 <editable-span v-bind:value="project.name" @edit="onEdit('projects['+index+'].name', $event)"></editable-span>
//               </h3>
//               <editable-span class="link" :value="project.link" @edit="onEdit('projects['+index+'].link', $event)"></editable-span>
//               <editable-span class="keywords" :value="project.keywords" @edit="onEdit('projects['+index+'].keywords', $event)">css3、jQuery、响应式</editable-span>
//             </header>
//             <p class="description">
//               <editable-span v-bind:value="project.description" v-on:edit="onEdit('projects['+index+'].description', $event)"></editable-span>
//             </p>
//             <span v-if="index>=1" @click="removeProject(index)">删除项目</span>
//           </li>
//         </ol>
//         <button @click="addProject">添加项目</button>
//       </section>
//     </div>
//   `,

//
// })
