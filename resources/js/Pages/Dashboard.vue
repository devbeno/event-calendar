<style>
.v-event {
    font-size: 1.2em;
    color: #ffffff !important;
}
.v-event div {
    font-size: 1.1em;
    color: #ffffff !important;
}
.v-event strong {
    display: none;
}
.theme--light.v-calendar-weekly .v-calendar-weekly__day {
    color: #ffffff !important;
    font-size: 0.8em !important;
}
.v-present .v-btn {
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
    margin-bottom: 1px;
}
.v-event-timed {
    padding: 10px;
    font-size: 1em !important;
    color: #ffffff !important;
}
.v-event-timed div {
    color: transparent !important;
}
.v-event-timed div strong {
    color: #ffffff !important;
}
</style>
<template>
    <app-layout>
        <template #header>
            <h2 class="h4 font-weight-bold mt-3">Calendar</h2>
        </template>
        <div class="row mb-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row m-1">
                            <div class="col-12 col-md-6 card-title">
                                <button
                                    class="btn btn-outline-primary btn-sm"
                                    @click="showModalAddEvent()"
                                >
                                    <span>Absence registration</span>
                                </button>
                                &nbsp;
                                <strong
                                    v-if="$refs.calendar"
                                    style="text-transform: capitalize"
                                    v-html="$refs.calendar.title"
                                >
                                </strong>
                            </div>
                            <div
                                class="col-12 col-md-6 d-flex justify-content-end align-items-end"
                            >
                                <button
                                    class="btn btn-primary"
                                    @click="setToday"
                                >
                                    Today
                                </button>
                                <button class="btn btn-default" @click="prev">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                                <button class="btn btn-default" @click="next">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                                <div class="dropdown">
                                    <button
                                        class="btn btn-default dropdown-toggle"
                                        type="button"
                                        id="calendarDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span v-html="typeToLabel[type]"></span>
                                    </button>
                                    <div
                                        class="dropdown-menu"
                                        aria-labelledby="calendarDropdown"
                                    >
                                        <button
                                            class="dropdown-item"
                                            @click="type = 'day'"
                                        >
                                            Day
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="type = 'week'"
                                        >
                                            Week
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="type = 'month'"
                                        >
                                            Month
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="type = '4day'"
                                        >
                                            4 days
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <v-sheet height="600">
                            <v-calendar
                                ref="calendar"
                                v-model="focus"
                                color="primary"
                                :events="events"
                                :event-color="getEventColor"
                                :type="type"
                                @click:event="showEvent"
                                @click:more="viewDay"
                                @click:date="viewDay"
                                @change="updateRange"
                                :locale="locale"
                                :event-name="getEventTitle"
                            >
                            </v-calendar>
                        </v-sheet>
                    </div>
                </div>
                <div
                    class="modal fade"
                    id="modalAddEvent"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="modalAddEvent"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div
                                class="modal-header"
                                :style="{
                                    'background-color': '#5d6ad0',
                                    color: '#fff',
                                }"
                            >
                                <h5 class="modal-title">
                                    Absence registration
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i class="fas fa-times text-sm"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit="addEvent" method="post">
                                    <div class="form-group">
                                        <label for="name">Title</label>
                                        <input
                                            name="name"
                                            id="name"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': errors.name,
                                            }"
                                            placeholder="Absence title"
                                            v-model="event.name"
                                            aria-describedby="name-live-feedback"
                                            required="required"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="description"
                                            >Description</label
                                        >
                                        <textarea
                                            name="description"
                                            id="description"
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    errors.description,
                                            }"
                                            placeholder="Sickness, Vacation etc"
                                            v-model="event.description"
                                        >
                                        </textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="description"
                                            >Start date</label
                                        >
                                        <input
                                            type="date"
                                            name="start_date"
                                            id="datepicker-start_date"
                                            v-model="event.startDate"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': errors.start_date,
                                            }"
                                            placeholder="Start date"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="end_date">Final date</label>
                                        <input
                                            type="date"
                                            name="end_date"
                                            id="datepicker-end_date"
                                            v-model="event.endDate"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': errors.end_date,
                                            }"
                                            placeholder="Final date"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="color">Color</label>
                                        <input
                                            type="color"
                                            name="color"
                                            id="color"
                                            class="form-control text-break text-wrap bg-transparent text-muted"
                                            :class="{
                                                'is-invalid': errors.color,
                                            }"
                                            placeholder="Color"
                                            v-model="event.color"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <div class="btn-group">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-sm mr-1"
                                        @click="addEvent()"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-secondary btn-sm"
                                        data-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="modal fade"
                    id="modalEvent"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="modalEvent"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div
                                class="modal-header text-white font-weight-bold"
                                :style="{ 'background-color': '#5d6ad0' }"
                            >
                                <h5 class="modal-title" id="editEvent">
                                    <button
                                        @click="
                                            showDeleteEvent = true;
                                            showUpdateEvent = false;
                                        "
                                        class="text-white mr-3"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <span v-html="event.name"></span>
                                </h5>
                                <button
                                    type="button"
                                    class="close text-white"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div
                                    v-if="!showUpdateEvent && !showDeleteEvent"
                                >
                                    <h3 v-html="event.description"></h3>
                                    <h5>
                                        From
                                        <span v-html="event.start"></span> To
                                        <span v-html="event.end"></span>
                                    </h5>
                                </div>
                                <div v-if="showUpdateEvent">
                                    <form @submit="updateEvent" method="post">
                                        <div class="form-group">
                                            <label for="name">Title</label>
                                            <input
                                                name="name"
                                                id="name"
                                                class="form-control"
                                                :class="{
                                                    'is-invalid': errors.name,
                                                }"
                                                placeholder="Absence title"
                                                v-model="event.name"
                                                aria-describedby="name-live-feedback"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="description"
                                                >Description</label
                                            >
                                            <textarea
                                                name="description"
                                                id="description"
                                                class="form-control"
                                                :class="{
                                                    'is-invalid':
                                                        errors.description,
                                                }"
                                                placeholder="Description"
                                                v-model="event.description"
                                            >
                                            </textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="description"
                                                >Start date</label
                                            >
                                            <input
                                                type="date"
                                                name="start_date"
                                                id="datepicker-start_date"
                                                v-model="event.startDate"
                                                class="form-control"
                                                :class="{
                                                    'is-invalid':
                                                        errors.start_date,
                                                }"
                                                placeholder="Start date"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="end_date"
                                                >Final date</label
                                            >
                                            <input
                                                type="date"
                                                name="end_date"
                                                id="datepicker-end_date"
                                                v-model="event.endDate"
                                                class="form-control"
                                                :class="{
                                                    'is-invalid':
                                                        errors.end_date,
                                                }"
                                                placeholder="Final date"
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="color"
                                                >Final hour</label
                                            >
                                            <input
                                                type="color"
                                                name="color"
                                                id="color"
                                                class="form-control text-break text-wrap bg-transparent text-muted"
                                                :class="{
                                                    'is-invalid': errors.color,
                                                }"
                                                placeholder="Color"
                                                v-model="event.color"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div v-if="showDeleteEvent">
                                    <h4>Are you sure to delete the event?</h4>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div
                                    class="btn-group btn-group-sm"
                                    v-if="!showUpdateEvent && !showDeleteEvent"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-secondary btn-sm mr-1"
                                        @click="hideModalEvent"
                                    >
                                        <span>Close</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        @click="mtdShowUpdateEvent(event)"
                                    >
                                        <span>Edit form</span>
                                    </button>
                                </div>
                                <div
                                    class="btn-group btn-group-sm"
                                    v-if="showUpdateEvent"
                                >
                                    <button
                                        @click="showUpdateEvent = false"
                                        type="button"
                                        class="btn btn-secondary btn-sm mr-1"
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        @click="updateEvent(event)"
                                    >
                                        <i class="fas fa-edit"></i>
                                        <span>Update</span>
                                    </button>
                                </div>
                                <div
                                    class="btn-group btn-group-sm"
                                    v-if="showDeleteEvent && !showUpdateEvent"
                                >
                                    <button
                                        @click="showDeleteEvent = false"
                                        type="button"
                                        class="btn btn-outline-secondary btn-sm mr-1"
                                    >
                                        No, cancel
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        @click="deleteEvent(event)"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                        Yes, delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<script>
import AppLayout from "@/Layouts/AppLayout";
import Vuetify, { VApp, VCalendar, VSheet } from "vuetify/lib";
export default {
    components: {
        AppLayout,
        // VUETIFY COMPONENTS
        VApp,
        VCalendar,
        VSheet,
    },
    data() {
        return {
            locale: "en",
            focus: "",
            type: "month",
            typeToLabel: {
                month: "Month",
                week: "Week",
                day: "Day",
                "4day": "Month",
            },
            events: [],
            selectedOpen: false,
            events: [],
            errors: [],
            errs: "",
            event: {
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                color: "#5d6ad0",
            },
            showUpdateEvent: false,
            showDeleteEvent: false,
        };
    },
    mounted() {
        this.getEvents();
        $(".v-event").css({ color: "#fff!important" });
    },
    methods: {
        // CALENDAR DEFAULT EVENTS
        viewDay({ date }) {
            console.log(date);
            this.focus = date;
            this.type = "day";
        },
        getEventColor(event) {
            return event.color;
        },
        setToday() {
            this.focus = "";
        },
        //
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        // SHOW EVENT
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.event = event;
                this.showUpdateEvent = false;
                this.showDeleteEvent = false;
                $("#modalEvent").modal({
                    backdrop: "static",
                    keyboard: false,
                });
                setTimeout(() => (this.selectedOpen = true), 10);
            };
            if (this.selectedOpen) {
                this.selectedOpen = false;
                setTimeout(open, 10);
            } else open();
        },
        getEventTitle(e) {
            return e.input.title;
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },
        updateRange({ start, end }) {
            this.start = start;
            this.end = end;
        },
        // END CALENDAR DEFAULT EVENTS
        // CRUD
        resetEvent() {
            this.event = {
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                color: "#5d6ad0",
            };
        },
        validateEvent() {
            if (
                this.event.name.trim() &&
                this.event.description.trim() &&
                this.event.startDate.trim() &&
                this.event.endDate.trim() &&
                this.event.color.trim()
            ) {
                this.event.start = `${this.event.startDate}`;
                this.event.end = `${this.event.endDate}`;
                if (this.event.start >= this.event.end) {
                    alert("The start date cannot be the same as the end date");
                    return false;
                }
                return true;
            } else {
                alert("Complete all fields");
                return false;
            }
        },
        showModalAddEvent() {
            this.resetEvent();
            $("#modalAddEvent").modal({
                backdrop: "static",
                keyboard: false,
            });
        },
        hideModalAddEvent() {
            this.resetEvent();
            $("#modalAddEvent").modal("hide");
        },
        hideModalEvent() {
            this.resetEvent();
            $("#modalEvent").modal("hide");
            this.selectedOpen = false;
        },
        mtdShowUpdateEvent(event) {
            this.event = event;
            this.event.startDate = event.start.substring(0, 2);
            this.event.endDate = event.end.substring(0, 2);
            this.showUpdateEvent = true;
        },
        hideModalEvent() {
            this.resetEvent();
            $("#modalEvent").modal("hide");
            this.selectedOpen = false;
        },
        // CRUD
        getEvents() {
            axios
                .post("calendars/index", {})
                .then((response) => {
                    this.events = response.data.data;
                })
                .catch((error) => {
                    if (error.response != null) {
                        if (error.response.status == 404)
                            return (window.location = "/");
                    }
                });
        },
        addEvent() {
            if (this.validateEvent()) {
                axios
                    .post("calendar", this.event)
                    .then((response) => {
                        this.hideModalAddEvent();
                        this.events.push(response.data);
                        alert("Absence added successfully");
                    })
                    .catch((error) => {
                        if (error.response != null) {
                            if (error.response.status == 422)
                                this.errors = error.response.data.errors;
                        }
                    });
            }
        },
        updateEvent(event) {
            if (this.validateEvent()) {
                axios
                    .put(`calendar/${event.id}`, this.event)
                    .then((response) => {
                        alert("Absence updated successfully");
                        this.showUpdateEvent = false;
                        this.events.splice(
                            this.events.findIndex(
                                (item) => item.id === event.id
                            ),
                            1,
                            response.data
                        );
                    })
                    .catch((error) => {
                        if (error.response != null) {
                            if (error.response.status == 422)
                                this.errors = error.response.data.errors;
                        }
                    });
            }
        },
        deleteEvent(event) {
            axios
                .delete(`calendar/${event.id}`, this.event)
                .then((response) => {
                    alert("Absence deleted successfully");
                    this.events.splice(
                        this.events.findIndex((item) => item.id === event.id),
                        1
                    );
                    this.hideModalEvent();
                    this.resetEvent();
                })
                .catch((error) => {
                    if (error.response != null) {
                        if (error.response.status == 422)
                            this.errors = error.response.data.errors;
                    }
                });
        },
    },
};
</script>
