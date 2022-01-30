import { computed, Ref } from 'vue';
import { GeneratedList } from 'components/models';
import { formatDate } from 'src/util/date';

export function useDateToFrom(list: Ref<GeneratedList>) {
  return {
    validFrom: computed(() => {
      return formatDate(new Date(list.value.createdAt))
    }),
    validTo: computed(() => {
      return formatDate(new Date(list.value.expiresAt))
    }),
  };
}
