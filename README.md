# Group Multiple Tabs

Save all tabs, or the tabs to the left or right, into a new tab group from the context menu in Chrome, Edge and Firefox.

## Context Menu

```text
Save Tabs to Group
  - All Tabs
  - Tabs to the Left
  - Tabs to the Right
```

- Chrome / Edge: right-click on the page.
- Firefox (139+): right-click on the page or on a tab in the tab strip.

The current tab is included. Pinned tabs and tabs that already belong to a group are skipped.

## Development

```sh
pnpm install
pnpm dev            # Chrome
pnpm dev:firefox
pnpm test
pnpm zip:all        # .output/*.zip for Chrome, Edge and Firefox
```

---

# Group Multiple Tabs

在 Chrome、Edge 和 Firefox 中通过右键菜单把“所有/左侧/右侧”标签页保存到新的标签页分组。

## 右键菜单

```text
保存标签页到分组
  - 所有标签页
  - 左侧标签页
  - 右侧标签页
```

- Chrome / Edge：在页面上右键。
- Firefox（139+）：在页面或标签栏的标签页上右键。

包含当前标签页；固定标签页和已在分组中的标签页会被跳过。

## 开发

```sh
pnpm install
pnpm dev            # Chrome
pnpm dev:firefox
pnpm test
pnpm zip:all        # 在 .output 下生成 Chrome、Edge、Firefox 的 zip
```
