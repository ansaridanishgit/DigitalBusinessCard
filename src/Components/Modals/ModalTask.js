import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Platform, Alert, ScrollView, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loadercomponent from '../Loader';
import { Dropdown } from 'react-native-element-dropdown';
import { FIREBASE_APP, FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import TaskModalCss from '../CSS/TaskModalCss'
import Toast from 'react-native-toast-message';

const ModalTask = ({ visible, onClose,fetchData }) => {
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const priority = [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date.toISOString().split('T')[0]);
        }
    };

    const handleSend = async () => {
        if (!task || !description || !selectedPriority || !selectedDate) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'All fields are required.',
            });    
            return 
        }
        try {
            setLoading(true)
          const docRef = await addDoc(collection(FIREBASE_DB, "Tasks"), {
            task: task,
            description: description,
            selectedPriority: selectedPriority,
            selectedDate: selectedDate,
            status: false
          });
      
          // Show success toast message
          Toast.show({
            type: 'success',
            text1: 'Task Added',
            text2: 'Your task has been added successfully.',
            text1Style:{fontSize:16},
            text2Style:{fontSize:14}
        });
          setTask('')
          setDescription('')
          setSelectedDate('')
          setSelectedPriority('')
          onClose()
          setLoading(false)

        // reload get all 
        fetchData()

        } catch (e) {
          setLoading(false)
          Alert.alert("Error adding task. Please try again later.");
        }
      };

    return (
        <>
        <ScrollView>
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}>
            <View style={TaskModalCss.modalBackground}>
                <View style={TaskModalCss.modalContainer}>
                    <Text style={TaskModalCss.heading}>Add new task</Text>

                    <View style={{ width: '100%' }}>
                        <Text style={TaskModalCss.label}>Task</Text>
                        <TextInput
                            style={TaskModalCss.input}
                            placeholder="Enter Task"
                            placeholderTextColor={"#5b5b5b"}
                            value={task}
                            onChangeText={text => setTask(text)}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={TaskModalCss.label}>Description</Text>
                        <TextInput
                            style={TaskModalCss.input}
                            placeholder="Write Description"
                            placeholderTextColor={"#5b5b5b"}
                            value={description}
                            onChangeText={text => setDescription(text)}
                        />
                    </View>

                    <View style={TaskModalCss.inputContainer}>
                        <Text style={TaskModalCss.label}>Priority</Text>
                        <Dropdown
                            style={TaskModalCss.dropdown}
                            placeholder="Select Priority"
                            placeholderStyle={TaskModalCss.placeholderStyle}
                            placeholderTextColor={"#5b5b5b"}
                            data={priority}
                            value={selectedPriority}
                            labelField="label"
                            valueField="value"
                            onChange={item => setSelectedPriority(item.value)}
                        />
                    </View>

                    <View style={TaskModalCss.inputContainer}>
                        <Text style={TaskModalCss.label}>Date</Text>
                        <Pressable
                            style={[TaskModalCss.input, TaskModalCss.dateInput]}
                            onPress={() => setShowDatePicker(true)}>
                            <Text style={{ color: selectedDate ? '#333' : '#5b5b5b' }}>
                                {selectedDate || 'Select Date'}
                            </Text>
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate ? new Date(selectedDate) : new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <View style={TaskModalCss.buttonContainer}>
                        <Pressable style={TaskModalCss.closeButton} onPress={onClose}>
                            <Text style={TaskModalCss.closeButtonText}>Close</Text>
                        </Pressable>
                        <Pressable
                            style={[TaskModalCss.sendButton, loading && { backgroundColor: '#999' }]}
                            onPress={handleSend}
                            disabled={loading}>
                            <Text style={TaskModalCss.sendButtonText}>
                                {loading ? 'Processing' : 'Add Task'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Loadercomponent Loader={loading} />
        </Modal>
        </ScrollView>
        <Toast />
        </>
    );
};
export default ModalTask;