export interface NormalizedComponent extends SidebarComponent {
  components?: SidebarComponent[]
  isSortable: boolean
}

export interface SidebarComponent {
  name: string
  treePath: string
}
