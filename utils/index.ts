import { UBadge, UButton, UDropdownMenu } from '#components';
import { type Column } from '@tanstack/vue-table';
import type { Service } from '~/types/services';

export function getHeader(column: Column<Service>, label: string) {
    const isSorted = column.getIsSorted()
  
    return h(
      UDropdownMenu,
      {
        content: {
          align: 'start'
        },
        'aria-label': 'Actions dropdown',
        items: [
          {
            label: 'Asc',
            type: 'checkbox',
            icon: 'i-lucide-arrow-up-narrow-wide',
            checked: isSorted === 'asc',
            onSelect: () => {
              if (isSorted === 'asc') {
                column.clearSorting()
              } else {
                column.toggleSorting(false)
              }
            }
          },
          {
            label: 'Desc',
            icon: 'i-lucide-arrow-down-wide-narrow',
            type: 'checkbox',
            checked: isSorted === 'desc',
            onSelect: () => {
              if (isSorted === 'desc') {
                column.clearSorting()
              } else {
                column.toggleSorting(true)
              }
            }
          }
        ]
      },
      () =>
        h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label,
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5 data-[state=open]:bg-(--ui-bg-elevated)',
          'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
        })
    )
  }