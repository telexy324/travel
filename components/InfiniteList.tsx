import React, { useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import { useFadeIn } from '../lib/animations';

interface InfiniteListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  onRefresh?: () => Promise<void>;
  onLoadMore?: () => Promise<void>;
  isLoading?: boolean;
  hasMore?: boolean;
  keyExtractor?: (item: T) => string;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
}

export function InfiniteList<T>({
  data,
  renderItem,
  onRefresh,
  onLoadMore,
  isLoading = false,
  hasMore = false,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
}: InfiniteListProps<T>) {
  const { opacity, fadeIn } = useFadeIn();

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    }
  }, [onRefresh]);

  const handleLoadMore = useCallback(async () => {
    if (onLoadMore && !isLoading && hasMore) {
      await onLoadMore();
    }
  }, [onLoadMore, isLoading, hasMore]);

  const renderFooter = () => {
    if (!isLoading || !hasMore) return null;
    return (
      <View className="py-5 items-center">
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        ) : undefined
      }
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
}); 