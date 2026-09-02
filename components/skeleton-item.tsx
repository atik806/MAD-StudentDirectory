import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function SkeletonItem() {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <Animated.View style={[styles.row, { opacity }]}>
            <View style={styles.avatar} />
            <View style={styles.info}>
                <View style={styles.namePlaceholder} />
                <View style={styles.deptPlaceholder} />
                <View style={styles.idPlaceholder} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#E2E8F0",
        marginRight: 14,
    },
    info: {
        flex: 1,
    },
    namePlaceholder: {
        width: "60%",
        height: 14,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
        marginBottom: 6,
    },
    deptPlaceholder: {
        width: "40%",
        height: 10,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
        marginBottom: 6,
    },
    idPlaceholder: {
        width: "30%",
        height: 8,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
    },
});
