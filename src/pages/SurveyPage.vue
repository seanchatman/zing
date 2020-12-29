<template>
  <q-page
    class="page-bg fit row wrap justify-center items-start content-start"
    padding
  >
    <q-card
      class="my-card"
      style="width: 500px; margin-top: 100px"
      flat
      bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="~assets/7-512.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h5">{{ pageTitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section v-if="content">
        <span v-html="content"></span>
        <q-form>
          <q-select
            v-if="selectOptions.length > 0"
            v-model="selectModel"
            :options="selectOptions"
            :label="selectLabel"
          ></q-select>
          <q-option-group
            v-model="checkboxModel"
            :options="checkboxOptions"
            color="green"
            type="checkbox"
          />
        </q-form>
      </q-card-section>

      <q-separator />
      <q-card-actions v-if="currentNode.buttons">
        <q-btn
          v-for="button in currentNode.buttons"
          :key="button.id"
          class="full-width"
          @click="onActionButtonClick(button)"
          >{{ button.button_text }}</q-btn
        >
      </q-card-actions>
      <q-card-actions v-if="project_node_id !== 1">
        <q-btn @click="onBackButtonClick">Back</q-btn>
        <q-btn @click="onRestartButtonClick">Restart</q-btn>
      </q-card-actions>
    </q-card>

    <pre class="absolute-bottom-right">Results:{{ results }}</pre>
  </q-page>
</template>

<script>
export default {
  name: "SurveyPage",
  data() {
    return {
      survey: null,
      selectModel: null,
      selectOptions: [],
      selectLabel: "",
      checkboxOptions: [],
      checkboxModel: [],
      results: {},
      project_node_id: 1,
    };
  },
  computed: {
    currentNode() {
      return this.survey ? this.survey.nodes[this.project_node_id] : -1;
    },
    formFields() {
      if (this.currentNode && this.currentNode.formfields.length > 0) {
        return this.currentNode.formfields;
      } else {
        return null;
      }
    },
    pageTitle() {
      return this.replaceWithResults(this.currentNode.page_title);
    },
    content() {
      return this.replaceWithResults(this.currentNode.content);
    },
  },
  watch: {
    $route() {
      this.project_node_id = parseInt(this.$route.params.project_node_id) || 1;

      this.parseFormFields();
    },
  },
  async created() {
    this.survey = await fetch(
      "https://zt-eng.s3.us-east-1.amazonaws.com/fe-challenge/survey.json"
    ).then((response) => response.json());

    this.project_node_id = parseInt(this.$route.params.project_node_id) || 1;

    this.parseFormFields();
  },
  methods: {
    onActionButtonClick(button) {
      if (this.currentNode.variable) {
        this.results[this.currentNode.variable] =
          button.value || this.selectModel;
      }

      this.$router.push(`/survey/${button.target_node_id}`);
    },
    onBackButtonClick() {
      this.$router.go(-1);
    },
    onRestartButtonClick() {
      this.results = {};
      this.$router.push("/survey/1");
    },
    parseFormFields() {
      this.clearData();

      if (this.formFields) {
        // Check for select options
        const selectFilter = this.formFields.filter(
          (field) => field.type === "select"
        );

        // Check for radio buttons
        const checkboxFilter = this.formFields.filter(
          (field) => field.type === "checkbox"
        );

        if (selectFilter.length > 0) {
          const selectField = selectFilter[0];

          this.selectOptions = selectField.options.split("\r\n");
          this.selectLabel = selectField.label;
        }

        if (checkboxFilter.length > 0) {
          this.checkboxModel = [];

          this.checkboxOptions = checkboxFilter.map((field) => {
            return {
              label: field.label,
              value: field.name,
              leftLabel: field.label_type !== "L",
            };
          });
        }
      }
    },
    replaceWithResults(value) {
      if (!value) return value;

      for (const prop in this.results) {
        value = value.replaceAll(`#${prop}#`, this.results[prop]);
      }

      // Sometimes user_profile isn't active.
      value = value.replaceAll("#user_profile#", "you");

      return value;
    },
    clearData() {
      this.selectModel = null;
      this.selectOptions = [];
      this.selectLabel = "";
      this.checkboxOptions = [];
    },
  },
};
</script>
<style scoped>
.page-bg {
  background-image: linear-gradient(180deg, coral, yellow);
}
</style>
