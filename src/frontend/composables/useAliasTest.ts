// This is a test composable to verify that the aliases are working correctly
export function useAliasTest() {
  return {
    message: "Alias test successful!",
    timestamp: new Date().toISOString(),
  };
}

export default useAliasTest;
