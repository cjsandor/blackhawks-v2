"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/home",{

/***/ "./pages/home.js":
/*!***********************!*\
  !*** ./pages/home.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Grid,Typography!=!@mui/material */ \"__barrel_optimize__?names=Grid,Typography!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/auth-helpers-react */ \"./node_modules/@supabase/auth-helpers-react/dist/index.js\");\n/* harmony import */ var _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Layout */ \"./components/Layout.js\");\n/* harmony import */ var _components_UpcomingGames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UpcomingGames */ \"./components/UpcomingGames.js\");\n/* harmony import */ var _components_FullSchedule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FullSchedule */ \"./components/FullSchedule.js\");\n// pages/home.js\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst HomePage = ()=>{\n    _s();\n    const [games, setGames] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [attendance, setAttendance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const user = (0,_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__.useUser)();\n    const supabase = (0,_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__.useSupabaseClient)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchGames();\n        fetchAttendance();\n        fetchUsers();\n    }, []);\n    const fetchGames = async ()=>{\n        const { data, error } = await supabase.from(\"games\").select(\"*\").order(\"date\", {\n            ascending: true\n        });\n        if (error) console.error(\"Error fetching games:\", error);\n        else setGames(data);\n    };\n    const fetchAttendance = async ()=>{\n        const { data, error } = await supabase.from(\"attendance\").select(\"*\");\n        if (error) console.error(\"Error fetching attendance:\", error);\n        else setAttendance(data);\n    };\n    const fetchUsers = async ()=>{\n        const { data, error } = await supabase.from(\"users\").select(\"id, name\");\n        if (error) console.error(\"Error fetching users:\", error);\n        else setUsers(data);\n    };\n    const handleClaimTickets = async (gameId, ticketCount, userId)=>{\n        try {\n            // Update the attendance status in the database\n            const { data, error } = await supabase.from(\"attendance\").update({\n                status: \"claimed\"\n            }).match({\n                game_id: gameId,\n                user_id: userId,\n                status: \"not attending\"\n            }).order(\"created_at\", {\n                ascending: true\n            }) // Add this line\n            .limit(ticketCount);\n            if (error) throw error;\n            // Update the local state to reflect the changes\n            setAttendance((prevAttendance)=>prevAttendance.map((a)=>a.game_id === gameId && a.user_id === userId && a.status === \"not attending\" ? {\n                        ...a,\n                        status: \"claimed\"\n                    } : a));\n        // You might want to show a success message here\n        } catch (error) {\n            console.error(\"Error claiming tickets:\", error);\n        // You might want to show an error message here\n        }\n    };\n    const handleToggleAttendance = async (gameId, userId, currentStatus)=>{\n        const newStatus = currentStatus === \"attending\" ? \"not attending\" : \"attending\";\n        const { data, error } = await supabase.from(\"attendance\").upsert({\n            game_id: gameId,\n            user_id: userId,\n            status: newStatus\n        }, {\n            onConflict: [\n                \"game_id\",\n                \"user_id\"\n            ]\n        });\n        if (error) {\n            console.error(\"Error updating attendance:\", error);\n            alert(\"Failed to update attendance: \".concat(error.message));\n        } else {\n            fetchAttendance();\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                variant: \"h4\",\n                gutterBottom: true,\n                children: \"Home\"\n            }, void 0, false, {\n                fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Grid, {\n                container: true,\n                spacing: 4,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Grid, {\n                        item: true,\n                        xs: 12,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UpcomingGames__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            games: games,\n                            attendance: attendance,\n                            onClaimTickets: handleClaimTickets,\n                            userId: user.id\n                        }, void 0, false, {\n                            fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                            lineNumber: 94,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                        lineNumber: 93,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Grid_Typography_mui_material__WEBPACK_IMPORTED_MODULE_6__.Grid, {\n                        item: true,\n                        xs: 12,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_FullSchedule__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                            games: games,\n                            attendance: attendance,\n                            users: users,\n                            onToggleAttendance: handleToggleAttendance\n                        }, void 0, false, {\n                            fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                            lineNumber: 97,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                        lineNumber: 96,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n                lineNumber: 92,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\develop\\\\blackawks-v2\\\\pages\\\\home.js\",\n        lineNumber: 90,\n        columnNumber: 5\n    }, undefined);\n};\n_s(HomePage, \"09FlFU6SYDLWZufhVoO0uvDCI1Q=\", false, function() {\n    return [\n        _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__.useUser,\n        _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_2__.useSupabaseClient\n    ];\n});\n_c = HomePage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\nvar _c;\n$RefreshReg$(_c, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ3JELE9BQU87WUFDTDVCO1FBQ0Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDYiwwREFBTUE7OzBCQUNMLDhEQUFDSiwyRkFBVUE7Z0JBQUM4QyxTQUFRO2dCQUFLQyxZQUFZOzBCQUFDOzs7Ozs7MEJBQ3RDLDhEQUFDOUMscUZBQUlBO2dCQUFDK0MsU0FBUztnQkFBQ0MsU0FBUzs7a0NBQ3ZCLDhEQUFDaEQscUZBQUlBO3dCQUFDaUQsSUFBSTt3QkFBQ0MsSUFBSTtrQ0FDYiw0RUFBQzlDLGlFQUFhQTs0QkFBQ0csT0FBT0E7NEJBQU9FLFlBQVlBOzRCQUFZMEMsZ0JBQWdCMUI7NEJBQW9CRyxRQUFRZixLQUFLdUMsRUFBRTs7Ozs7Ozs7Ozs7a0NBRTFHLDhEQUFDcEQscUZBQUlBO3dCQUFDaUQsSUFBSTt3QkFBQ0MsSUFBSTtrQ0FDYiw0RUFBQzdDLGdFQUFZQTs0QkFBQ0UsT0FBT0E7NEJBQU9FLFlBQVlBOzRCQUFZRSxPQUFPQTs0QkFBTzBDLG9CQUFvQmY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2hHO0dBN0ZNaEM7O1FBSVNMLGlFQUFPQTtRQUNIQywyRUFBaUJBOzs7S0FMOUJJO0FBK0ZOLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2hvbWUuanM/MTY3OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9ob21lLmpzXHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFR5cG9ncmFwaHksIEdyaWQgfSBmcm9tICdAbXVpL21hdGVyaWFsJztcclxuaW1wb3J0IHsgdXNlVXNlciwgdXNlU3VwYWJhc2VDbGllbnQgfSBmcm9tICdAc3VwYWJhc2UvYXV0aC1oZWxwZXJzLXJlYWN0JztcclxuaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL0xheW91dCc7XHJcbmltcG9ydCBVcGNvbWluZ0dhbWVzIGZyb20gJy4uL2NvbXBvbmVudHMvVXBjb21pbmdHYW1lcyc7XHJcbmltcG9ydCBGdWxsU2NoZWR1bGUgZnJvbSAnLi4vY29tcG9uZW50cy9GdWxsU2NoZWR1bGUnO1xyXG5cclxuY29uc3QgSG9tZVBhZ2UgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2dhbWVzLCBzZXRHYW1lc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2F0dGVuZGFuY2UsIHNldEF0dGVuZGFuY2VdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IHVzZXIgPSB1c2VVc2VyKCk7XHJcbiAgY29uc3Qgc3VwYWJhc2UgPSB1c2VTdXBhYmFzZUNsaWVudCgpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2hHYW1lcygpO1xyXG4gICAgZmV0Y2hBdHRlbmRhbmNlKCk7XHJcbiAgICBmZXRjaFVzZXJzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBmZXRjaEdhbWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ2dhbWVzJylcclxuICAgICAgLnNlbGVjdCgnKicpXHJcbiAgICAgIC5vcmRlcignZGF0ZScsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xyXG4gICAgaWYgKGVycm9yKSBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBnYW1lczonLCBlcnJvcik7XHJcbiAgICBlbHNlIHNldEdhbWVzKGRhdGEpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGZldGNoQXR0ZW5kYW5jZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCdhdHRlbmRhbmNlJylcclxuICAgICAgLnNlbGVjdCgnKicpO1xyXG4gICAgaWYgKGVycm9yKSBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBhdHRlbmRhbmNlOicsIGVycm9yKTtcclxuICAgIGVsc2Ugc2V0QXR0ZW5kYW5jZShkYXRhKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBmZXRjaFVzZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnNlbGVjdCgnaWQsIG5hbWUnKTtcclxuICAgIGlmIChlcnJvcikgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlcnM6JywgZXJyb3IpO1xyXG4gICAgZWxzZSBzZXRVc2VycyhkYXRhKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGFpbVRpY2tldHMgPSBhc3luYyAoZ2FtZUlkLCB0aWNrZXRDb3VudCwgdXNlcklkKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBVcGRhdGUgdGhlIGF0dGVuZGFuY2Ugc3RhdHVzIGluIHRoZSBkYXRhYmFzZVxyXG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKCdhdHRlbmRhbmNlJylcclxuICAgICAgICAudXBkYXRlKHsgc3RhdHVzOiAnY2xhaW1lZCcgfSlcclxuICAgICAgICAubWF0Y2goeyBnYW1lX2lkOiBnYW1lSWQsIHVzZXJfaWQ6IHVzZXJJZCwgc3RhdHVzOiAnbm90IGF0dGVuZGluZycgfSlcclxuICAgICAgICAub3JkZXIoJ2NyZWF0ZWRfYXQnLCB7IGFzY2VuZGluZzogdHJ1ZSB9KSAvLyBBZGQgdGhpcyBsaW5lXHJcbiAgICAgICAgLmxpbWl0KHRpY2tldENvdW50KTtcclxuXHJcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGxvY2FsIHN0YXRlIHRvIHJlZmxlY3QgdGhlIGNoYW5nZXNcclxuICAgICAgc2V0QXR0ZW5kYW5jZShwcmV2QXR0ZW5kYW5jZSA9PiBcclxuICAgICAgICBwcmV2QXR0ZW5kYW5jZS5tYXAoYSA9PiBcclxuICAgICAgICAgIGEuZ2FtZV9pZCA9PT0gZ2FtZUlkICYmIGEudXNlcl9pZCA9PT0gdXNlcklkICYmIGEuc3RhdHVzID09PSAnbm90IGF0dGVuZGluZydcclxuICAgICAgICAgICAgPyB7IC4uLmEsIHN0YXR1czogJ2NsYWltZWQnIH1cclxuICAgICAgICAgICAgOiBhXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gWW91IG1pZ2h0IHdhbnQgdG8gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZSBoZXJlXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjbGFpbWluZyB0aWNrZXRzOicsIGVycm9yKTtcclxuICAgICAgLy8gWW91IG1pZ2h0IHdhbnQgdG8gc2hvdyBhbiBlcnJvciBtZXNzYWdlIGhlcmVcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVUb2dnbGVBdHRlbmRhbmNlID0gYXN5bmMgKGdhbWVJZCwgdXNlcklkLCBjdXJyZW50U3RhdHVzKSA9PiB7XHJcbiAgICBjb25zdCBuZXdTdGF0dXMgPSBjdXJyZW50U3RhdHVzID09PSAnYXR0ZW5kaW5nJyA/ICdub3QgYXR0ZW5kaW5nJyA6ICdhdHRlbmRpbmcnO1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ2F0dGVuZGFuY2UnKVxyXG4gICAgICAudXBzZXJ0KHsgZ2FtZV9pZDogZ2FtZUlkLCB1c2VyX2lkOiB1c2VySWQsIHN0YXR1czogbmV3U3RhdHVzIH0sIHsgb25Db25mbGljdDogWydnYW1lX2lkJywgJ3VzZXJfaWQnXSB9KTtcclxuICBcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBhdHRlbmRhbmNlOicsIGVycm9yKTtcclxuICAgICAgYWxlcnQoYEZhaWxlZCB0byB1cGRhdGUgYXR0ZW5kYW5jZTogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmV0Y2hBdHRlbmRhbmNlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxMYXlvdXQ+XHJcbiAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNFwiIGd1dHRlckJvdHRvbT5Ib21lPC9UeXBvZ3JhcGh5PlxyXG4gICAgICA8R3JpZCBjb250YWluZXIgc3BhY2luZz17NH0+XHJcbiAgICAgICAgPEdyaWQgaXRlbSB4cz17MTJ9PlxyXG4gICAgICAgICAgPFVwY29taW5nR2FtZXMgZ2FtZXM9e2dhbWVzfSBhdHRlbmRhbmNlPXthdHRlbmRhbmNlfSBvbkNsYWltVGlja2V0cz17aGFuZGxlQ2xhaW1UaWNrZXRzfSB1c2VySWQ9e3VzZXIuaWR9IC8+XHJcbiAgICAgICAgPC9HcmlkPlxyXG4gICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfT5cclxuICAgICAgICAgIDxGdWxsU2NoZWR1bGUgZ2FtZXM9e2dhbWVzfSBhdHRlbmRhbmNlPXthdHRlbmRhbmNlfSB1c2Vycz17dXNlcnN9IG9uVG9nZ2xlQXR0ZW5kYW5jZT17aGFuZGxlVG9nZ2xlQXR0ZW5kYW5jZX0gLz5cclxuICAgICAgICA8L0dyaWQ+XHJcbiAgICAgIDwvR3JpZD5cclxuICAgIDwvTGF5b3V0PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZTtcclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiVHlwb2dyYXBoeSIsIkdyaWQiLCJ1c2VVc2VyIiwidXNlU3VwYWJhc2VDbGllbnQiLCJMYXlvdXQiLCJVcGNvbWluZ0dhbWVzIiwiRnVsbFNjaGVkdWxlIiwiSG9tZVBhZ2UiLCJnYW1lcyIsInNldEdhbWVzIiwiYXR0ZW5kYW5jZSIsInNldEF0dGVuZGFuY2UiLCJ1c2VycyIsInNldFVzZXJzIiwidXNlciIsInN1cGFiYXNlIiwiZmV0Y2hHYW1lcyIsImZldGNoQXR0ZW5kYW5jZSIsImZldGNoVXNlcnMiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJjb25zb2xlIiwiaGFuZGxlQ2xhaW1UaWNrZXRzIiwiZ2FtZUlkIiwidGlja2V0Q291bnQiLCJ1c2VySWQiLCJ1cGRhdGUiLCJzdGF0dXMiLCJtYXRjaCIsImdhbWVfaWQiLCJ1c2VyX2lkIiwibGltaXQiLCJwcmV2QXR0ZW5kYW5jZSIsIm1hcCIsImEiLCJoYW5kbGVUb2dnbGVBdHRlbmRhbmNlIiwiY3VycmVudFN0YXR1cyIsIm5ld1N0YXR1cyIsInVwc2VydCIsIm9uQ29uZmxpY3QiLCJhbGVydCIsIm1lc3NhZ2UiLCJ2YXJpYW50IiwiZ3V0dGVyQm90dG9tIiwiY29udGFpbmVyIiwic3BhY2luZyIsIml0ZW0iLCJ4cyIsIm9uQ2xhaW1UaWNrZXRzIiwiaWQiLCJvblRvZ2dsZUF0dGVuZGFuY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/home.js\n"));

/***/ })

});