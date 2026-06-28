export const KVRAT_CONSTITUTION = {
  rules: {
    storage: {
      history: 'done',
      ideas: 'planned',
    },

    classification: {
      doneKeywords: ['done', 'finished', 'completed', 'تم'],
      plannedKeywords: ['plan', 'todo', 'idea', 'سيتم', 'لاحقاً'],
    },

    stability: {
      allowInvalidJson: false,
      autoRepairMemory: true,
    },
  },
};