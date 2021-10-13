<template>
  <div>
    <template v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <v-row v-else>
      <v-col cols="6">
        <v-row justify="center" align="center">
          <column-chart :data-table="dataTable" :options="options" />
        </v-row>
      </v-col>
      <v-col cols="6">
        <p class="subtitle-2 text-right">
          {{ numberOfProduct.label }}
          <span class="text--secondary">{{ numberOfProduct.result | formatNumber }}</span>
        </p>
        <p class="text-right subtitle-2 mb-0" v-text="dateOfSurvey.label"></p>
        <v-list flat dense class="text-right">
          <v-list-item v-for="date in dateOfSurvey.result" :key="date">
            <v-list-item-content>
              <v-list-item-title class="text--secondary">{{ date | formatTime }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import servicesGetSurveyResult from '@/services/surveys/getResult';
import { IQCM, ISurveyItem } from '@/models/survey';
import { ICol, IOption, IRow, ITable } from '@/models/chart';
import formatTime from '@/filters/formatTime';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  components: {
    ColumnChart: () => import('@/components/Shared/Chart/ColumnChart.vue')
  },
  filters: {
    formatTime
  }
})
export default class SurveyDetail extends Vue {
  @Prop({ type: String, required: true })
  readonly code!: string;

  @Watch('code')
  async onCodeChange() {
    await this.loadChartData();
  }

  loading = false;
  numberOfProduct: ISurveyItem = {
    result: 0,
    type: 'numeric',
    label: ''
  };
  dateOfSurvey: ISurveyItem = {
    result: [] as string[],
    type: 'date',
    label: ''
  };
  options: IOption = {
    title: '',
    width: 400,
    height: 300
  };
  dataTable: ITable = {
    cols: [],
    rows: []
  };

  async loadChartData() {
    try {
      this.loading = true;
      if (this.code) {
        const surveyResult = await servicesGetSurveyResult(this.code);
        const qcmResult = surveyResult.find((s) => s.type === 'qcm') as ISurveyItem;
        this.dataTable = this.formatDataToTable(qcmResult.result as IQCM);
        this.options.title = qcmResult.label;
        this.numberOfProduct = surveyResult.find((s) => s.type === 'numeric') as ISurveyItem;
        this.dateOfSurvey = surveyResult.find((s) => s.type === 'date') as ISurveyItem;
        this.dateOfSurvey.result = (this.dateOfSurvey.result as string[]).sort(function (a, b) {
          return new Date(a).getTime() - new Date(b).getTime();
        });
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  formatDataToTable(data: IQCM) {
    const cols: ICol[] = [];
    const rows: IRow[] = [];
    cols.push({
      type: 'string',
      role: 'domain'
    });
    cols.push({
      type: 'number',
      role: 'data'
    });
    let i = 0;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        rows.push({
          c: []
        });
        rows[i].c.push({
          v: key
        });
        rows[i].c.push({
          v: element
        });
        i++;
      }
    }
    return {
      cols,
      rows
    };
  }

  async mounted() {
    await this.loadChartData();
  }
}
</script>

<style scoped></style>
