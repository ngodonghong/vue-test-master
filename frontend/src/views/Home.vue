<template>
  <v-row>
    <v-col cols="12" lg="8" offset-lg="2">
      <v-text-field id="search-input" data-test="searchInput" v-model="searchInput" outlined dense label="Search name or code" />
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Code</th>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredSurveys"
              :key="item.code"
              @click="handleChooseSurvey(item)"
              class="survey-item"
            >
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col v-if="selectedSurvey && selectedSurvey.code" cols="12">
      <SurveyDetail :code="selectedSurvey.code" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import servicesGetListSurveys from '@/services/surveys/getList';
import { ISurvey } from '@/models/survey';

@Component({
  components: {
    SurveyDetail: () =>
      import(/* webpackChunkName: "survey-detail" */ '@/components/SurveyDetail/index.vue')
  }
})
export default class Home extends Vue {
  surveys: ISurvey[] = [];
  selectedSurvey: ISurvey = {
    name: '',
    code: ''
  };
  searchInput = '';

  get filteredSurveys() {
    if (this.searchInput) {
      return this.surveys.filter((s) => {
        const re = new RegExp(this.searchInput, 'mi');
        return s.name.match(re) || s.code.match(re);
      });
    } else {
      return this.surveys;
    }
  }

  async beforeMount() {
    try {
      const data = await servicesGetListSurveys();
      this.surveys = data;
    } catch (error) {
      console.error(error);
    }
  }

  handleChooseSurvey(item: ISurvey) {
    this.selectedSurvey = item;
  }
}
</script>

<style scoped>
.survey-item:hover {
  cursor: pointer;
}
</style>
