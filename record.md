这是一个很好的问题！`useCallback`和`useMemo`是React中用于性能优化的两个重要Hook，但很多人对何时使用它们感到困惑。让我详细解释一下：

### 何时使用useCallback

`useCallback`用于记忆函数，避免在每次渲染时创建新的函数实例。主要在以下情况使用：

1. **将函数作为props传递给子组件**：

   ```TypeScript
   // 父组件
   const handleClick = useCallback(() => {
     // 处理点击
   }, [依赖项]);

   return <ChildComponent onClick={handleClick} />;
   ```

2. **函数被用作其他Hook的依赖项**：

   ```TypeScript
   const fetchData = useCallback(async () => {
     const data = await api.getData();
     setData(data);
   }, [setData]);

   useEffect(() => {
     fetchData();
   }, [fetchData]); // 只有当fetchData变化时才重新执行
   ```

3. **函数被用在数组或对象中，而这些数组/对象又被用作依赖项**：
   ```TypeScript
   const memoizedValue = useMemo(() => {
     return computeExpensiveValue(a, b);
   }, [a, b]);
   ```

### 何时使用useMemo

`useMemo`用于记忆计算结果，避免在每次渲染时进行昂贵的计算。主要在以下情况使用：

1. **昂贵的计算**：

   ```TypeScript
   const memoizedValue = useMemo(() => {
     return computeExpensiveValue(props.data);
   }, [props.data]);
   ```

2. **保持引用相等性**：

   ```TypeScript
   const memoizedObject = useMemo(() => ({
     key: value,
     otherKey: otherValue
   }), [value, otherValue]);
   ```

3. **避免不必要的子组件渲染**：

   ```TypeScript
   const memoizedProps = useMemo(() => ({
     data: props.data,
     onClick: props.onClick
   }), [props.data, props.onClick]);

   return <ExpensiveComponent {...memoizedProps} />;
   ```

### 关于你的代码示例

```TypeScript
const logOut = useCallback(() => {
  setUserInfo(null)
}, [setUserInfo])
```

在这个例子中，使用`useCallback`是合理的，因为：

1. `logOut`函数可能被传递给子组件（如菜单项），如果每次渲染都创建新函数，可能会导致子组件不必要的重新渲染。
2. `setUserInfo`是从store中获取的，通常它是稳定的（不会变化），所以依赖项数组中的内容不会频繁变化，这使得`useCallback`的效果更好。

### 性能优化的基本原则

1. **不要过早优化**：只有在确实存在性能问题时才进行优化。
2. **测量性能**：使用React DevTools的Profiler来识别性能瓶颈。
3. **考虑成本**：`useCallback`和`useMemo`本身也有成本（内存和计算），所以只在真正需要时使用。
4. **关注重新渲染**：主要的性能问题通常来自于不必要的重新渲染，而不是函数创建或计算。

### 实际应用指南

1. **默认情况**：不要使用`useCallback`或`useMemo`。

2. **使用useCallback的情况**：
   - 函数被传递给使用`React.memo`的子组件
   - 函数被用作`useEffect`或其他Hook的依赖项
   - 函数被用在需要引用相等性的地方（如依赖数组）

3. **使用useMemo的情况**：
   - 计算成本高（如复杂的数据处理、大量计算）
   - 需要保持引用相等性（如将对象/数组传递给子组件）
   - 避免昂贵的渲染操作

4. **不需要使用的情况**：
   - 简单的组件渲染
   - 不昂贵的计算
   - 函数只在当前组件使用，且不被传递给子组件或用作依赖项

### 示例分析

让我们分析一些常见场景：

```TypeScript
// 1. 不需要useCallback - 简单事件处理，不传递给子组件
const handleClick = () => {
  console.log('Clicked');
};

// 2. 需要useCallback - 传递给使用React.memo的子组件
const handleChildClick = useCallback(() => {
  // 处理逻辑
}, [依赖项]);

return <MemoizedChild onClick={handleChildClick} />;

// 3. 需要useMemo - 昂贵的计算
const filteredList = useMemo(() => {
  return largeList.filter(item => item.active);
}, [largeList]);

// 4. 需要useMemo - 保持引用相等性
const style = useMemo(() => ({
  color: theme.primary,
  fontSize: '16px'
}), [theme.primary]);

return <div style={style}>Content</div>;
```

### 总结

在你的代码中，使用`useCallback`来包装`logOut`函数是合理的，因为它可能被传递给菜单项，并且使用了`setUserInfo`作为依赖项。同样，使用`useCallback`来包装`changeMainColor`和创建防抖函数也是合理的，因为这些函数被用作事件处理程序，并且依赖于其他状态或函数。

记住，性能优化应该是有针对性的，基于实际的性能瓶颈，而不是盲目地应用优化技术。在大多数情况下，React的默认行为已经足够高效，只有在遇到性能问题时才需要考虑使用`useCallback`和`useMemo`。
