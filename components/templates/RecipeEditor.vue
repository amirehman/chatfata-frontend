<template>
  <div>
    <div
      class="editor-wrapper border border-gray-400 dark:border-gray-700 rounded focus:bg-gray-100 border-gray-400 min-h-10rem"
    >
      <div class="editor-menu-bar p-3 pb-2">
        <client-only>
          <editor-menu-bubble
            :editor="editor"
            :keep-in-bounds="keepInBounds"
            v-slot="{ commands, isActive, menu }"
          >
            <div>
              <button
                type="button"
                class="menubar__button mr-3 focus:outline-none"
                :class="{ 'is-active': isActive.bold() }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
                @click="commands.bold"
              >
                <span
                  class="text-gray-700 hover:text-gray-900 dark:text-gray-400"
                >
                  <svg
                    class="fill-current w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M3 19V1h8a5 5 0 013.88 8.16A5.5 5.5 0 0111.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 100-5zM7 4v4h3a2 2 0 100-4H7z"
                    />
                  </svg>
                </span>
              </button>
              <!-- button -->

              <button
                type="button"
                class="menubar__button mr-3 focus:outline-none"
                :class="{ 'is-active': isActive.underline() }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
                @click="commands.underline"
              >
                <span
                  class="text-gray-700 hover:text-gray-900 dark:text-gray-400"
                >
                  <svg
                    class="fill-current w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M16 9A6 6 0 114 9V1h3v8a3 3 0 006 0V1h3v8zM2 17h16v2H2v-2z"
                    />
                  </svg>
                </span>
              </button>
              <!-- button -->

              <button
                type="button"
                class="menubar__button mr-3 focus:outline-none"
                :class="{ 'is-active': isActive.italic() }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
                @click="commands.italic"
              >
                <span
                  class="text-gray-700 hover:text-gray-900 dark:text-gray-400"
                >
                  <svg
                    class="fill-current w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z" />
                  </svg>
                </span>
              </button>
              <!-- button -->
            </div>
          </editor-menu-bubble>
        </client-only>
      </div>
      <div class="editor">
        <client-only>
          <editor-content
            class="textarea text-lg focus:bg-gray-100"
            :editor="editor"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from "tiptap";
import { Bold, Italic, Underline } from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBubble
  },
  // props: ["value"],
  data() {
    return {
      keepInBounds: true,
      editor: null
    };
  },
  // computed: {
  //   value() {
  //     return this.$store.state.recipe.step
  //   }
  // },
  mounted() {
    this.editor = new Editor({
      extensions: [new Bold(), new Italic(), new Underline()],
      // content: this.$store.state.recipe.step,
      onUpdate: ({ getHTML }) => {
        this.$emit("input", getHTML());
      }
    });
    // this.editor.setContent(this.$store.state.recipe.step);
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  watch: {
    // value(val) {
    //   // so cursor doesn't jump to start on typing
    //   if (this.editor && val !== this.value) {
    //     this.editor.setContent(val, true);
    //   }
    // }
  }
};
</script>

<style lang="scss">
.textarea .ProseMirror {
  outline: none !important;
  padding: 0.75rem;
  p {
    font-size: 1.125rem;
  }
}
</style>
