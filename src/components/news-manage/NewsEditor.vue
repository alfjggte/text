<template>
  <div class="home">
    <el-tiptap v-model="formInline.contentFileList" :extensions="extensions" />
  </div>
</template>

<script>
// @ is an alias to /src
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Blockquote,
  TextAlign,
  Indent,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TextColor,
  HorizontalRule,
} from "element-tiptap";
export default {
  components: {},
  props: { formInline: Object },
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
        new Underline({ bubble: true, menubar: false }),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image(),
        new Blockquote(),
        new TextAlign(),
        new Indent(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new HorizontalRule(),
        new TextColor(),
      ],
      // 添加信息数据
    };
  },
  methods: {},
};
</script>
<style scoped></style>
