import AddStudentForm from "@/components/add-student-form";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-detail";
import StudentItem from "@/components/student-item";
import { useDebounce } from "@/hooks/use-debounce";
import { Student, STUDENTS } from "@/data/students";
// Add useRef and useEffect to the import
import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { Text, StyleSheet, View, FlatList, Pressable } from "react-native";

import { router } from "expo-router";
import { useStudents } from "../../context/students-context";
import { SafeAreaView } from "react-native-safe-area-context";

// app/(tabs)/index.tsx — import TextInput (not to be used as part of UI, but the type is needed for useRef)
import { TextInput } from "react-native";
import ErrorScreen from "@/components/error-screen";
import SkeletonItem from "@/components/skeleton-item";


export default function HomePage() {
    const [query, setQuery] = useState<string>("");
    // Debounce the query — filter only runs 300ms after typing stops
    const debouncedQuery = useDebounce(query, 300);

    const searchRef = useRef<TextInput>(null);
    // Focus the search bar 300ms after mount (lets animation finish)
    useEffect(() => {
        const timer = setTimeout(() => {
            searchRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []); // [] — run once on mount only

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Replaced by router navigation
    // const [showForm, setShowForm] = useState(false);

    // Replaced by context
    // const [students, setStudents] = useState<Student[]>(STUDENTS);
    // Read students directly from the global context
    const { students, isLoading, error } = useStudents();


    const [retryKey, setRetryKey] = useState(0);
    const handleRetry = useCallback(() => {
        setRetryKey(k=>(k + 1));
    },[]);

    // Only recomputes when students or debouncedQuery changes.
    // Declared before the loading/error guards so the number of hooks
    // called stays constant between renders (Rules of Hooks).
    const filtered = useMemo(() => {
        return students.filter((s) => s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || s.department.toLowerCase().includes(debouncedQuery.toLowerCase()));
    }, [students, debouncedQuery]);

    const EmptyList = useCallback(() => {
        if (query.length > 0) {
            return (
                <View style={styles.empty}>
                    <Text style={styles.emptyTitle}>No results</Text>
                    <Text style={styles.emptySub}>
                        No students match "{debouncedQuery}"
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyTitle}>No students yet</Text>
                <Text style={styles.emptySub}>
                    Tap + Add to add the first student
                </Text>
            </View>
        );
    }, [query, debouncedQuery]);


    if (isLoading) {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Student Directory</Text>
                    <View style={styles.addButton}>
                        <Text style={styles.addButtonText}>+ Add</Text>
                    </View>
                </View>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6]}
                    keyExtractor={(item) => String(item)}
                    renderItem={() => <SkeletonItem />}
                />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <ErrorScreen message={error} onRetry={handleRetry} />
        );
    }

    // No longer needed
    // const handleNewStudent = (newStudent: Student) => {
    //     // Lifting state up in action: the form hands the new
    //     // student back to this parent screen, which prepends
    //     // it to the list.
    //     setStudents((prev) => [newStudent, ...prev]);
    //     setShowForm(false);
    // };

    const handleSelect = (student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    };

    // Replaced by new route
    // if (showForm) {
    //     return <AddStudentForm onSubmitSuccess={handleNewStudent} onClose={() => setShowForm(false)} />;
    // }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                {/* Navigate to the AddStudent screen — no prop passing needed */}
                <Pressable style={styles.addButton} onPress={() => router.push("/(tabs)/add-student")}
                    accessibilityRole="button"
                    accessibilityLabel="Add new student"
                    accessibilityHint="Opens the Add Student form"
                >
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
            </View>

            <SearchBar 
				// NEW: apply the useRef here:
				ref={searchRef}
				value={query} 
				onChangeText={setQuery} 
			/>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />}
                ListEmptyComponent={EmptyList}
            />

            {selectedStudent && <StudentDetail student={selectedStudent} onRemoved={() => setSelectedStudent(null)} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
    addButton: {
        backgroundColor: "#0D9488",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
    empty: { padding: 40, alignItems: "center" },
    emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#334155" },
    emptySub: { fontSize: 14, color: "#64748B" },
    emptyText: { fontSize: 14, color: "#94A3B8" },


});
