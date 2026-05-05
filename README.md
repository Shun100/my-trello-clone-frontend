# my-trello-clone-frontend

## 1. 環境構築

```bash
  <!-- プロジェクトの初期化 -->
  npm create vite@latest .

  <!-- ライブラリのインストール -->
  npm install bootstrap
  npm install axios
  npm install react-router-dom
  npm install jotai
  npm install @hello-pangea/dnd

  <!-- デプロイ確認 -->
  npm run dev
```

## 2 @hello-pangea/dnd について

- [GitHub](https://github.com/hello-pangea/dnd)

### 2-1 `DraggableContext`

- ドラッグ＆ドロップしたい領域全体をこのコンポーネントで覆う
- Propsとして5つのイベントハンドラが定義されている
  - onBeforeCapture: ドラッグ開始前 (DOMにも検知される前) の処理
  - onBeforeDragStart: ドラッグ開始前 (DOMには検知済み) の処理
  - onDragStart: ドラッグ開始時の処理
  - onDragUpdate: ドラッグ中に変化が起こった (ソートが発生した) ときの処理
  - onDragEnd: ドラッグ終了時の処理

### 2-2 `Droppable`

- ドラッグ先になり得る領域をこのコンポーネントで覆う
- arguments
  - `provided: (DroppableProvided)`
    - この要素をDnDライブラリに認識させるための情報一式
    - `provided.innerRef`
      - DroppableのDOM要素をライブラリに渡すための参照
      - DnDライブラリは「この要素がドロップ領域です」と正確にDOMを知る必要がある そのために`ref`を直接受け取る
    - `provided.droppableProps`
      - Droppableとして必要なイベント・属性をまとめたProps
      - `data-rbd-droppable-id`やスタリング・ドラッグ判定用の属性など
    - `provided.placeholder`
      - ドラッグ中に空間を確保するための「ダミー要素」
      - ドラッグ中に要素が移動して空いた隙間を埋めてスタイルが崩れないようにしてくれる
  - `snapshot: (DroppableStateSnapshot)`
    - ドラッグ中のUI制御に使う状態が入っている
    - `snapshot.isDraggingOver`
      - 今このDroppableの上にドラッグ中のアイテムが乗っているか
    - `snapshot.draggingOverWith`
      - このDroppableの上に乗っているDraggableのID

  ```TypeScript
    import { Droppable } from '@hello-pangea/dnd';

    <Droppable droppableId="droppable-1" type="Person" direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
          {...provided.droppableProps}
        >
        <h2>I am a droppable</h2>
        {provided.placeholder}
      )}
    </Droppable>
  ```

## 2-3 `Draggable`

- ドラッグ可能な要素をこのコンポーネントで覆う
- arguments
  - `provided: (DraggableProvided)`
    - この要素をDnDライブラリに認識させるための情報一式
    - `provided.innerRef`
      - DraggableのDOM要素をライブラリに渡すための参照
      - DnDライブラリは「この要素がドラッグ可能です」と正確にDOMを知る必要がある そのために`ref`を直接受け取る
    - `provided.draggableProps`
      - ドラッグ可能にするための設定情報一式
    - `provided.dragHandleProps`
      - 「どこを掴んでドラッグするか」指定する
  - `snapshot: (DraggableStateSnapshot)`
    - ドラッグ中のUI制御に使う状態が入っている
    - `snapshot.isDragging`
      - ドラッグ中か
    - `snapshot.draggingOver`
      - どのDroppableの上にいるか (droppableId)

  ```TypeScript
  {
    this.props.items.map((item, index) => (
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    ));
  }
  ```
