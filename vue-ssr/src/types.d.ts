// 删除export会报错
// export declare global {
//   interface Window {
//     __INITIAL_STATE__: any;
//   }
// }
// 在 TypeScript 中，每个文件都是一个模块。在一个模块中，所有声明都会被视为私有的，
// 除非它们被显式地导出。`.d.ts` 文件也不例外，如果你希望将一个声明导出到其他模块中使用，
// 你需要在 `.d.ts` 文件中显式地将其导出。<br><br>如果一个 `.d.ts` 文件中没有任何名称
// 被显式地导出，那么它将被视为一个私有模块，其他模块将无法访问其中的声明。为了能够让其他
// 模块访问 `.d.ts` 文件中的声明，你需要在文件底部添加一个空的导出对象 `export {}`。这
// 样做可以将 `.d.ts` 文件转换为一个模块，使得其中的声明可以在其他模块中使用。<br><br>总
// 之，`.d.ts` 文件中加上 `export {}` 的作用是将文件转换为一个模块，允许其中的声明可以
// 在其他模块中使用。
export {};
declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}
