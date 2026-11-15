window.THINKWAM = {
  "authors": [
    {
      "name": "Haoyun Tang",
      "sup": "1*"
    },
    {
      "name": "Baqiao Deng",
      "sup": "1*"
    },
    {
      "name": "Enjin Zhou",
      "sup": "1"
    },
    {
      "name": "Songwen Tian",
      "sup": "1"
    },
    {
      "name": "Keyao Xu",
      "sup": "2"
    },
    {
      "name": "Bowen Jing",
      "sup": "3"
    },
    {
      "name": "Kun Wang",
      "sup": "4"
    },
    {
      "name": "Zhandong Mei",
      "sup": "1"
    },
    {
      "name": "Ke Ma",
      "sup": "5"
    },
    {
      "name": "Huibin Li",
      "sup": "1,5†"
    }
  ],
  "affiliations": [
    {
      "index": 1,
      "name": "Xi'an Jiaotong University",
      "logo": "assets/logos/xjtu_lockup.png",
      "logoBounds": {
        "width": 2935,
        "height": 786,
        "x": 0,
        "y": 0,
        "cropWidth": 2935,
        "cropHeight": 786,
        "displayWidth": 180
      }
    },
    {
      "index": 2,
      "name": "Nankai University",
      "logo": "assets/logos/nankai_purple.png",
      "logoBounds": {
        "width": 330,
        "height": 73,
        "x": 0,
        "y": 0,
        "cropWidth": 231,
        "cropHeight": 72,
        "displayWidth": 155
      }
    },
    {
      "index": 3,
      "name": "The University of Manchester",
      "logo": "assets/logos/manchester_transparent.png",
      "logoBounds": {
        "width": 1864,
        "height": 843,
        "x": 352,
        "y": 176,
        "cropWidth": 1160,
        "cropHeight": 488,
        "displayWidth": 151
      }
    },
    {
      "index": 4,
      "name": "Nanyang Technological University",
      "logo": "assets/logos/ntu.png",
      "logoBounds": {
        "width": 3006,
        "height": 1079,
        "x": 0,
        "y": 0,
        "cropWidth": 3006,
        "cropHeight": 1079,
        "displayWidth": 160
      }
    },
    {
      "index": 5,
      "name": "Phantrix Research",
      "logo": "assets/logos/phantrix_transparent.png",
      "logoBounds": {
        "width": 2172,
        "height": 724,
        "x": 65,
        "y": 108,
        "cropWidth": 1969,
        "cropHeight": 483,
        "displayWidth": 165
      }
    }
  ],
  "authorNotes": "* Equal contribution.  † Corresponding author.",
  "arxivUrl": null,
  "codeUrl": "https://github.com/ThinkWAM-Project",
  "benchmarks": {
    "libero": {
      "title": "40 tasks. Four suites.",
      "description": "1,974 successes across the fixed 2,000-record evaluation set: 40 tasks with 50 episodes per task. The reported aggregate success rate is 98.70%.",
      "rows": [
        {
          "label": "Spatial",
          "value": 98.4,
          "decimals": 1
        },
        {
          "label": "Object",
          "value": 100.0,
          "decimals": 1
        },
        {
          "label": "Goal",
          "value": 98.4,
          "decimals": 1
        },
        {
          "label": "Long",
          "value": 98.0,
          "decimals": 1
        }
      ]
    },
    "plus": {
      "title": "Seven axes of visual and task variation.",
      "description": "The reported 84.76% is an unweighted macro average over seven perturbation categories. Each category contributes equally to the aggregate.",
      "rows": [
        {
          "label": "Camera",
          "value": 93.62
        },
        {
          "label": "Initial state",
          "value": 74.19
        },
        {
          "label": "Language",
          "value": 74.82
        },
        {
          "label": "Lighting",
          "value": 97.37
        },
        {
          "label": "Texture",
          "value": 74.91
        },
        {
          "label": "Noise",
          "value": 95.94
        },
        {
          "label": "Layout",
          "value": 82.49
        }
      ]
    },
    "robotwin": {
      "title": "Bimanual manipulation under two conditions.",
      "description": "A fixed 20-task subset with 100 evaluation episodes per task and condition. Reported results: 1,715 / 2,000 for Clean and 1,317 / 2,000 for Random.",
      "rows": [
        {
          "label": "Clean",
          "value": 85.75
        },
        {
          "label": "Random",
          "value": 65.85
        }
      ]
    },
    "robocasa": {
      "title": "Manipulation in kitchen environments.",
      "description": "RoboCasa24 uses 24 tasks, 50 demonstrations per task, and 50 evaluation rollouts per task. The reported average task success is 65.17%.",
      "rows": [
        {
          "label": "RoboCasa24",
          "value": 65.17
        }
      ]
    }
  },
  "demos": [
    {
      "type": "real",
      "group": "Standard setting",
      "title": "Object repositioning during execution",
      "description": "The eraser and bottle are repeatedly moved by hand; the robot then places both in the box.",
      "src": "assets/videos/real-standard-dynamic.mp4",
      "poster": "assets/posters/real-standard-dynamic.jpg",
      "duration": "41.2 s · full recording",
      "source_record": "arm_model_20261114_224105_612578_63586",
      "frame_count": 618,
      "fps": 15.0,
      "trimmed": false
    },
    {
      "type": "real",
      "group": "Lighting perturbation",
      "title": "Colored lighting",
      "description": "The robot places the tissue packet and eraser into the box under colored illumination.",
      "src": "assets/videos/real-lighting-static.mp4",
      "poster": "assets/posters/real-lighting-static.jpg",
      "duration": "21.9 s · full recording",
      "source_record": "arm_model_20261114_232032_804706_68296",
      "frame_count": 329,
      "fps": 15.0,
      "trimmed": false
    },
    {
      "type": "real",
      "group": "Lighting perturbation",
      "title": "Colored lighting with three objects",
      "description": "Under colored illumination, the robot places a tissue packet, a small green pouch, and an eraser into the box.",
      "src": "assets/videos/real-lighting-objects.mp4",
      "poster": "assets/posters/real-lighting-objects.jpg",
      "frame_count": 523,
      "fps": 15.0,
      "duration": "34.9 s · full recording",
      "source_record": "arm_model_20261114_231849_438412_68117",
      "trimmed": false
    },
    {
      "type": "real",
      "group": "Multiple objects",
      "title": "Two bottles among distractors",
      "description": "Both green bottles are placed in the box in a cluttered scene.",
      "src": "assets/videos/real-multi-static.mp4",
      "poster": "assets/posters/real-multi-static.jpg",
      "duration": "35.1 s · full recording",
      "source_record": "arm_model_20261114_225614_047426_65337",
      "frame_count": 526,
      "fps": 15.0,
      "trimmed": false
    },
    {
      "type": "real",
      "group": "Multiple objects",
      "title": "Multiple objects with repositioning",
      "description": "Two erasers are moved and reoriented by hand during execution; the full recording retains both placements.",
      "src": "assets/videos/real-multi-dynamic.mp4",
      "poster": "assets/posters/real-multi-dynamic.jpg",
      "duration": "59.0 s · full recording",
      "source_record": "arm_model_20261114_225726_429411_65489",
      "frame_count": 885,
      "fps": 15.0,
      "trimmed": false
    },
    {
      "type": "simulation",
      "src": "assets/videos/simulation-01-main.mp4",
      "poster": "assets/posters/simulation-01-main.jpg",
      "title": "Close the drawer with the bowl inside",
      "description": "LIBERO · long-horizon manipulation",
      "duration": "11.9 s · 1×",
      "group": "LIBERO / LIBERO-Plus",
      "aspect": "1 / 1",
      "views": [
        {
          "id": "main",
          "label": "Main view",
          "src": "assets/videos/simulation-01-main.mp4",
          "poster": "assets/posters/simulation-01-main.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/simulation-01-wrist.mp4",
          "poster": "assets/posters/simulation-01-wrist.jpg"
        }
      ],
      "frame_count": 119,
      "fps": 10.0
    },
    {
      "type": "simulation",
      "src": "assets/videos/simulation-02-main.mp4",
      "poster": "assets/posters/simulation-02-main.jpg",
      "title": "Place the cream cheese and butter in the basket",
      "description": "LIBERO-Plus · background texture variation",
      "duration": "15.6 s · 1×",
      "group": "LIBERO / LIBERO-Plus",
      "aspect": "1 / 1",
      "views": [
        {
          "id": "main",
          "label": "Main view",
          "src": "assets/videos/simulation-02-main.mp4",
          "poster": "assets/posters/simulation-02-main.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/simulation-02-wrist.mp4",
          "poster": "assets/posters/simulation-02-wrist.jpg"
        }
      ],
      "frame_count": 156,
      "fps": 10.0
    },
    {
      "type": "simulation",
      "src": "assets/videos/simulation-03-main.mp4",
      "poster": "assets/posters/simulation-03-main.jpg",
      "title": "Place the mug and pudding by the plate",
      "description": "LIBERO-Plus · object layout variation",
      "duration": "11.4 s · 1×",
      "group": "LIBERO / LIBERO-Plus",
      "aspect": "1 / 1",
      "views": [
        {
          "id": "main",
          "label": "Main view",
          "src": "assets/videos/simulation-03-main.mp4",
          "poster": "assets/posters/simulation-03-main.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/simulation-03-wrist.mp4",
          "poster": "assets/posters/simulation-03-wrist.jpg"
        }
      ],
      "frame_count": 114,
      "fps": 10.0
    },
    {
      "type": "simulation",
      "group": "LIBERO / LIBERO-Plus",
      "title": "Open the drawer and place the bowl inside",
      "description": "LIBERO-Plus · lighting variation",
      "src": "assets/videos/simulation-04-main.mp4",
      "poster": "assets/posters/simulation-04-main.jpg",
      "views": [
        {
          "id": "main",
          "label": "Main view",
          "src": "assets/videos/simulation-04-main.mp4",
          "poster": "assets/posters/simulation-04-main.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/simulation-04-wrist.mp4",
          "poster": "assets/posters/simulation-04-wrist.jpg"
        }
      ],
      "aspect": "1 / 1",
      "duration": "9.4 s · 1×",
      "frame_count": 94,
      "fps": 10.0
    },
    {
      "type": "simulation",
      "group": "RoboTwin 2.0",
      "title": "Place the cup on the coaster",
      "description": "Complete action replay · head camera · 3× simulation speed",
      "src": "assets/videos/robotwin-cup.mp4",
      "poster": "assets/posters/robotwin-cup.jpg",
      "frame_count": 571,
      "fps": 25.0,
      "aspect": "1 / 1",
      "duration": "22.8 s · 3×",
      "playback_speed": 3
    },
    {
      "type": "simulation",
      "group": "RoboTwin 2.0",
      "title": "Place the toy car in the basket",
      "description": "Complete action replay · head camera · 3× simulation speed",
      "src": "assets/videos/robotwin-basket.mp4",
      "poster": "assets/posters/robotwin-basket.jpg",
      "frame_count": 536,
      "fps": 25.0,
      "aspect": "1 / 1",
      "duration": "21.4 s · 3×",
      "playback_speed": 3
    },
    {
      "type": "simulation",
      "group": "RoboTwin 2.0",
      "title": "Place the shoe on the mat",
      "description": "Complete action replay · head camera · 3× simulation speed",
      "src": "assets/videos/robotwin-shoe.mp4",
      "poster": "assets/posters/robotwin-shoe.jpg",
      "frame_count": 463,
      "fps": 25.0,
      "aspect": "1 / 1",
      "duration": "18.5 s · 3×",
      "playback_speed": 3
    },
    {
      "type": "simulation",
      "group": "RoboTwin 2.0",
      "title": "Strike the block with the hammer",
      "description": "Complete action replay · head camera · 3× simulation speed",
      "src": "assets/videos/robotwin-hammer.mp4",
      "poster": "assets/posters/robotwin-hammer.jpg",
      "frame_count": 683,
      "fps": 25.0,
      "aspect": "1 / 1",
      "duration": "27.3 s · 3×",
      "playback_speed": 3
    },
    {
      "type": "simulation",
      "group": "RoboCasa24",
      "title": "Place the object in the cabinet",
      "description": "Selected successful execution · fixed-scene adaptation run",
      "src": "assets/videos/robocasa-cabinet-left.mp4",
      "poster": "assets/posters/robocasa-cabinet-left.jpg",
      "views": [
        {
          "id": "left",
          "label": "Left view",
          "src": "assets/videos/robocasa-cabinet-left.mp4",
          "poster": "assets/posters/robocasa-cabinet-left.jpg"
        },
        {
          "id": "right",
          "label": "Right view",
          "src": "assets/videos/robocasa-cabinet-right.mp4",
          "poster": "assets/posters/robocasa-cabinet-right.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/robocasa-cabinet-wrist.mp4",
          "poster": "assets/posters/robocasa-cabinet-wrist.jpg"
        }
      ],
      "aspect": "1 / 1",
      "duration": "12.9 s · 1×",
      "frame_count": 258,
      "fps": 20.0,
      "source_case": "PnPCounterToCab_ep000"
    },
    {
      "type": "simulation",
      "group": "RoboCasa24",
      "title": "Place the mug under the coffee machine",
      "description": "Selected successful execution · fixed-scene adaptation run",
      "src": "assets/videos/robocasa-coffee-left.mp4",
      "poster": "assets/posters/robocasa-coffee-left.jpg",
      "views": [
        {
          "id": "left",
          "label": "Left view",
          "src": "assets/videos/robocasa-coffee-left.mp4",
          "poster": "assets/posters/robocasa-coffee-left.jpg"
        },
        {
          "id": "right",
          "label": "Right view",
          "src": "assets/videos/robocasa-coffee-right.mp4",
          "poster": "assets/posters/robocasa-coffee-right.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/robocasa-coffee-wrist.mp4",
          "poster": "assets/posters/robocasa-coffee-wrist.jpg"
        }
      ],
      "aspect": "1 / 1",
      "duration": "13.8 s · 1×",
      "frame_count": 277,
      "fps": 20.0,
      "source_case": "CoffeeSetupMug_ep009"
    },
    {
      "type": "simulation",
      "group": "RoboCasa24",
      "title": "Open the drawer",
      "description": "Selected successful execution · fixed-scene adaptation run",
      "src": "assets/videos/robocasa-drawer-left.mp4",
      "poster": "assets/posters/robocasa-drawer-left.jpg",
      "views": [
        {
          "id": "left",
          "label": "Left view",
          "src": "assets/videos/robocasa-drawer-left.mp4",
          "poster": "assets/posters/robocasa-drawer-left.jpg"
        },
        {
          "id": "right",
          "label": "Right view",
          "src": "assets/videos/robocasa-drawer-right.mp4",
          "poster": "assets/posters/robocasa-drawer-right.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/robocasa-drawer-wrist.mp4",
          "poster": "assets/posters/robocasa-drawer-wrist.jpg"
        }
      ],
      "aspect": "1 / 1",
      "duration": "11.2 s · 1×",
      "frame_count": 224,
      "fps": 20.0,
      "source_case": "OpenDrawer_ep000"
    },
    {
      "type": "simulation",
      "group": "RoboCasa24",
      "title": "Turn the sink spout",
      "description": "Selected successful execution · fixed-scene adaptation run",
      "src": "assets/videos/robocasa-spout-left.mp4",
      "poster": "assets/posters/robocasa-spout-left.jpg",
      "views": [
        {
          "id": "left",
          "label": "Left view",
          "src": "assets/videos/robocasa-spout-left.mp4",
          "poster": "assets/posters/robocasa-spout-left.jpg"
        },
        {
          "id": "right",
          "label": "Right view",
          "src": "assets/videos/robocasa-spout-right.mp4",
          "poster": "assets/posters/robocasa-spout-right.jpg"
        },
        {
          "id": "wrist",
          "label": "Wrist",
          "src": "assets/videos/robocasa-spout-wrist.mp4",
          "poster": "assets/posters/robocasa-spout-wrist.jpg"
        }
      ],
      "aspect": "1 / 1",
      "duration": "6.3 s · 1×",
      "frame_count": 127,
      "fps": 20.0
    }
  ],
  "realVideoNote": "Full recordings, grouped by the conditions shown. Human interventions reposition task objects and are retained in the videos. Both camera views and the original recorded playback rate are preserved. These selected demonstrations do not constitute a real-world success-rate measurement.",
  "comparisons": {
    "libero": {
      "title": "LIBERO",
      "columns": [
        {
          "key": "method",
          "label": "Method",
          "unit": null,
          "direction": null
        },
        {
          "key": "size_b",
          "label": "Size (B)",
          "unit": "B",
          "direction": null
        },
        {
          "key": "action_pretraining",
          "label": "Action P.T.",
          "unit": null,
          "direction": null
        },
        {
          "key": "spatial",
          "label": "Spatial",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "object",
          "label": "Object",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "goal",
          "label": "Goal",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "long",
          "label": "Long",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "average",
          "label": "Avg.",
          "unit": "%",
          "direction": "higher"
        }
      ],
      "rows": [
        {
          "method": "π0.5",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "spatial": "98.8",
          "object": "98.2",
          "goal": "98.0",
          "long": "92.4",
          "average": "96.9",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "pi05"
          ],
          "source_emphasis": {
            "spatial": "underline"
          }
        },
        {
          "method": "ABot-M0",
          "size_b": "4.6",
          "action_pretraining": "Yes",
          "spatial": "98.8",
          "object": "99.8",
          "goal": "99.0",
          "long": "96.6",
          "average": "98.6",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "yang2026abot"
          ],
          "source_emphasis": {
            "spatial": "underline",
            "object": "underline",
            "goal": "bold",
            "average": "underline"
          }
        },
        {
          "method": "ResVLA",
          "size_b": "4.0",
          "action_pretraining": "No",
          "spatial": "96.0",
          "object": "100.0",
          "goal": "97.4",
          "long": "92.8",
          "average": "96.6",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "resvla"
          ],
          "source_emphasis": {
            "object": "bold"
          }
        },
        {
          "method": "FastWAM",
          "size_b": "6.0",
          "action_pretraining": "No",
          "spatial": "98.2",
          "object": "100.0",
          "goal": "97.0",
          "long": "95.2",
          "average": "97.6",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "yuan2026fastwam"
          ],
          "source_emphasis": {
            "object": "bold"
          }
        },
        {
          "method": "ImageWAM",
          "size_b": "4.5",
          "action_pretraining": "No",
          "spatial": "97.2",
          "object": "99.2",
          "goal": "98.8",
          "long": "98.4",
          "average": "98.4",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "imagewam"
          ],
          "source_emphasis": {
            "goal": "underline",
            "long": "bold"
          }
        },
        {
          "method": "ForeWAM",
          "size_b": "1.5",
          "action_pretraining": "No",
          "spatial": "97.6",
          "object": "99.8",
          "goal": "98.0",
          "long": "96.2",
          "average": "97.9",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "huang2026foresight"
          ],
          "source_emphasis": {
            "object": "underline"
          }
        },
        {
          "method": "VLANeXt (Base)",
          "size_b": "2.5",
          "action_pretraining": "No",
          "spatial": "99.0",
          "object": "99.2",
          "goal": "96.6",
          "long": "94.8",
          "average": "97.4",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "vlanext"
          ],
          "source_emphasis": {
            "spatial": "bold"
          }
        },
        {
          "method": "VLA-JEPA",
          "size_b": "2.3",
          "action_pretraining": "Yes",
          "spatial": "96.2",
          "object": "99.6",
          "goal": "97.2",
          "long": "95.8",
          "average": "97.2",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "vlajepa"
          ],
          "source_emphasis": {}
        },
        {
          "method": "JEPA-WAM",
          "size_b": "1.3",
          "action_pretraining": "No",
          "spatial": "95.6",
          "object": "99.4",
          "goal": "97.2",
          "long": "94.6",
          "average": "96.7",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "lin2026jepawam"
          ],
          "source_emphasis": {}
        },
        {
          "method": "V-JEPA Policy (from scratch)",
          "size_b": "0.9",
          "action_pretraining": "No",
          "spatial": "97.2",
          "object": "98.0",
          "goal": "97.0",
          "long": "96.8",
          "average": "97.3",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "zhang2026vjepapolicy"
          ],
          "source_emphasis": {}
        },
        {
          "method": "ThinkWAM",
          "size_b": "1.5",
          "action_pretraining": "No",
          "spatial": "98.4",
          "object": "100.0",
          "goal": "98.4",
          "long": "98.0",
          "average": "98.7",
          "is_ours": true,
          "group": "JEPA-based methods",
          "citation_keys": [],
          "source_emphasis": {
            "object": "bold",
            "long": "underline",
            "average": "bold"
          }
        }
      ],
      "notes": [
        "Comparison reproduced from the manuscript. Bold and underlined values retain its best and second-best annotations.",
        "All success columns are percentages. Size is billions of parameters.",
        "Action P.T. denotes additional robot-policy pretraining with action labels, including inherited pretrained policy weights. Visual/language/video initialization alone does not count.",
        "LIBERO average scores are retained as reported; no averages were recalculated .",
        "ThinkWAM evaluation: 40 tasks, first 50 initial states per task, 2,000 records; native task predicates.",
        "Baseline values are literature results compiled in the manuscript, not reruns performed for this website. Seven rows follow V-JEPA Policy Table 1; ABot-M0, ForeWAM, and VLANeXt use their respective cited tables.",
        "Size conventions differ: ABot-M0 excludes optional spatial modules; V-JEPA Policy excludes its frozen text encoder."
      ]
    },
    "plus": {
      "title": "LIBERO-Plus",
      "columns": [
        {
          "key": "method",
          "label": "Method",
          "unit": null,
          "direction": null
        },
        {
          "key": "camera",
          "label": "Camera",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "initial_state",
          "label": "Init.",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "language",
          "label": "Language",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "light",
          "label": "Light",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "texture",
          "label": "Texture",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "noise",
          "label": "Noise",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "layout",
          "label": "Layout",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "average",
          "label": "Avg.",
          "unit": "%",
          "direction": "higher"
        }
      ],
      "rows": [
        {
          "method": "π0.5",
          "camera": "64.0",
          "initial_state": "58.0",
          "language": "88.5",
          "light": "96.6",
          "texture": "81.4",
          "noise": "87.5",
          "layout": "85.9",
          "average": "80.3",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "pi05"
          ],
          "source_emphasis": {
            "language": "underline",
            "layout": "bold"
          }
        },
        {
          "method": "ABot-M0",
          "camera": "60.4",
          "initial_state": "67.9",
          "language": "86.4",
          "light": "96.2",
          "texture": "91.6",
          "noise": "86.4",
          "layout": "82.6",
          "average": "81.6",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "yang2026abot"
          ],
          "source_emphasis": {}
        },
        {
          "method": "ResVLA",
          "camera": "53.2",
          "initial_state": "57.5",
          "language": "88.2",
          "light": "94.5",
          "texture": "96.3",
          "noise": "81.8",
          "layout": "78.3",
          "average": "78.5",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "resvla"
          ],
          "source_emphasis": {
            "texture": "bold"
          }
        },
        {
          "method": "FastWAM",
          "camera": "16.4",
          "initial_state": "44.5",
          "language": "68.9",
          "light": "78.2",
          "texture": "53.7",
          "noise": "37.7",
          "layout": "60.7",
          "average": "51.4",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "yuan2026fastwam"
          ],
          "source_emphasis": {}
        },
        {
          "method": "ImageWAM",
          "camera": "80.8",
          "initial_state": "50.3",
          "language": "91.4",
          "light": "98.1",
          "texture": "85.5",
          "noise": "93.8",
          "layout": "80.5",
          "average": "82.9",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "imagewam"
          ],
          "source_emphasis": {
            "language": "bold",
            "light": "bold"
          }
        },
        {
          "method": "ForeWAM",
          "camera": "61.7",
          "initial_state": "56.8",
          "language": "85.1",
          "light": "95.8",
          "texture": "76.5",
          "noise": "89.1",
          "layout": "83.0",
          "average": "78.3",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "huang2026foresight"
          ],
          "source_emphasis": {}
        },
        {
          "method": "VLANeXt (Base)",
          "camera": "90.4",
          "initial_state": "65.7",
          "language": "81.8",
          "light": "95.9",
          "texture": "82.5",
          "noise": "94.1",
          "layout": "80.8",
          "average": "84.5",
          "is_ours": false,
          "group": "Non-JEPA methods",
          "citation_keys": [
            "vlanext"
          ],
          "source_emphasis": {
            "camera": "underline",
            "noise": "underline",
            "average": "underline"
          }
        },
        {
          "method": "VLA-JEPA",
          "camera": "63.3",
          "initial_state": "67.1",
          "language": "85.4",
          "light": "95.6",
          "texture": "93.6",
          "noise": "66.3",
          "layout": "85.1",
          "average": "79.5",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "vlajepa"
          ],
          "source_emphasis": {
            "layout": "underline"
          }
        },
        {
          "method": "JEPA-WAM",
          "camera": "79.2",
          "initial_state": "59.2",
          "language": "68.2",
          "light": "93.3",
          "texture": "94.6",
          "noise": "83.6",
          "layout": "76.1",
          "average": "79.2",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "lin2026jepawam"
          ],
          "source_emphasis": {
            "texture": "underline"
          }
        },
        {
          "method": "V-JEPA Policy (from scratch)",
          "camera": "70.0",
          "initial_state": "80.7",
          "language": "64.9",
          "light": "97.2",
          "texture": "80.0",
          "noise": "87.8",
          "layout": "79.1",
          "average": "80.0",
          "is_ours": false,
          "group": "JEPA-based methods",
          "citation_keys": [
            "zhang2026vjepapolicy"
          ],
          "source_emphasis": {
            "initial_state": "bold"
          }
        },
        {
          "method": "ThinkWAM",
          "camera": "93.62",
          "initial_state": "74.19",
          "language": "74.82",
          "light": "97.37",
          "texture": "74.91",
          "noise": "95.94",
          "layout": "82.49",
          "average": "84.76",
          "is_ours": true,
          "group": "JEPA-based methods",
          "citation_keys": [],
          "source_emphasis": {
            "camera": "bold",
            "initial_state": "underline",
            "light": "underline",
            "noise": "bold",
            "average": "bold"
          }
        }
      ],
      "notes": [
        "Comparison reproduced from the manuscript. Bold and underlined values retain its best and second-best annotations.",
        "All success columns are percentages. Avg. in the manuscript is the unweighted mean of the seven categories for every method; values here are copied verbatim without recalculation.",
        "ThinkWAM uses the same checkpoint as LIBERO without OOD fine-tuning. Evaluation covers all 10,030 registry variants at initial state 0.",
        "Category totals: Camera 1,599; Init. 1,550; Language 1,537; Light 1,142; Texture 1,076; Noise 1,601; Layout 1,525.",
        "84.76% is category macro success; the manuscript reports 84.84% as the micro average over records. ",
        "Baseline sources follow the LIBERO convention; ABot-M0 reports zero-shot transfer from LIBERO."
      ]
    },
    "robotwin": {
      "title": "RoboTwin 2.0",
      "columns": [
        {
          "key": "method",
          "label": "Method",
          "unit": null,
          "direction": null
        },
        {
          "key": "size_b",
          "label": "Size (B)",
          "unit": "B",
          "direction": null
        },
        {
          "key": "action_pretraining",
          "label": "P.T.",
          "unit": null,
          "direction": null
        },
        {
          "key": "clean",
          "label": "Clean",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "random",
          "label": "Random",
          "unit": "%",
          "direction": "higher"
        },
        {
          "key": "average",
          "label": "Avg.",
          "unit": "%",
          "direction": "higher"
        }
      ],
      "rows": [
        {
          "method": "Diffusion Policy",
          "size_b": "—",
          "action_pretraining": "No",
          "clean": "48.0",
          "random": "1.6",
          "average": "24.8",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "chi2023diffusionpolicy"
          ],
          "source_emphasis": {},
          "size_status": "omitted for conventional policy in source"
        },
        {
          "method": "ACT",
          "size_b": "—",
          "action_pretraining": "No",
          "clean": "51.8",
          "random": "4.0",
          "average": "27.9",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zhao2023learningfinegrainedbimanualmanipulation"
          ],
          "source_emphasis": {},
          "size_status": "omitted for conventional policy in source"
        },
        {
          "method": "RDT-1B",
          "size_b": "1.2",
          "action_pretraining": "Yes",
          "clean": "56.0",
          "random": "24.1",
          "average": "40.1",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "liu2024rdt1b"
          ],
          "source_emphasis": {}
        },
        {
          "method": "DP3",
          "size_b": "—",
          "action_pretraining": "No",
          "clean": "73.9",
          "random": "8.3",
          "average": "41.1",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "ze2024dp3"
          ],
          "source_emphasis": {},
          "size_status": "omitted for conventional policy in source"
        },
        {
          "method": "π0",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "clean": "62.5",
          "random": "23.9",
          "average": "43.2",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "black2024pi0"
          ],
          "source_emphasis": {}
        },
        {
          "method": "GO-1",
          "size_b": "2.82",
          "action_pretraining": "Yes",
          "clean": "56.75",
          "random": "55.60",
          "average": "56.2",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "bi2025motus"
          ],
          "source_emphasis": {
            "random": "underline"
          },
          "protocol_note": "Mixed Clean + Random training data"
        },
        {
          "method": "π0.5",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "clean": "75.4",
          "random": "37.2",
          "average": "56.3",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "pi05"
          ],
          "source_emphasis": {}
        },
        {
          "method": "JEPA-WAM",
          "size_b": "1.3",
          "action_pretraining": "No",
          "clean": "79.9",
          "random": "36.9",
          "average": "58.4",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "lin2026jepawam"
          ],
          "source_emphasis": {}
        },
        {
          "method": "π0.5 + JEPA Obj.",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "clean": "84.6",
          "random": "37.5",
          "average": "61.1",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "lin2026jepawam"
          ],
          "source_emphasis": {}
        },
        {
          "method": "PAVE",
          "size_b": "1.3",
          "action_pretraining": "No",
          "clean": "86.8",
          "random": "45.2",
          "average": "66.0",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "pave2026"
          ],
          "source_emphasis": {
            "clean": "bold",
            "average": "underline"
          },
          "protocol_note": "Additional Clean-environment interaction"
        },
        {
          "method": "ThinkWAM",
          "size_b": "1.5",
          "action_pretraining": "No",
          "clean": "85.75",
          "random": "65.85",
          "average": "75.8",
          "is_ours": true,
          "group": null,
          "citation_keys": [],
          "source_emphasis": {
            "clean": "underline",
            "random": "bold",
            "average": "bold"
          }
        }
      ],
      "notes": [
        "Comparison reproduced from the manuscript. Bold and underlined values retain its best and second-best annotations.",
        "All success columns are percentages on the fixed 20-task subset from JEPA-WAM Appendix D.",
        "ThinkWAM trains on 50 Clean demonstrations for each of 50 training tasks; evaluation uses 100 episodes per task per condition, 2,000 Clean and 2,000 Random records.",
        "Avg. is the Clean/Random average as displayed in the manuscript; retained verbatim.",
        "GO-1 is trained on mixed Clean and Random demonstrations across 50 tasks; its scores are re-averaged in the manuscript over the fixed 20 tasks.",
        "PAVE additionally uses Clean-environment interaction. These protocols differ from Clean-demonstration-only training.",
        "Dashes in Size mean omitted model sizes for conventional policies, not zero parameters."
      ]
    },
    "robocasa": {
      "title": "RoboCasa24",
      "columns": [
        {
          "key": "method",
          "label": "Method",
          "unit": null,
          "direction": null
        },
        {
          "key": "size_b",
          "label": "Size (B)",
          "unit": "B",
          "direction": null
        },
        {
          "key": "action_pretraining",
          "label": "P.T.",
          "unit": null,
          "direction": null
        },
        {
          "key": "demos_per_task",
          "label": "Demos",
          "unit": null,
          "direction": null
        },
        {
          "key": "average",
          "label": "Avg.",
          "unit": "%",
          "direction": "higher"
        }
      ],
      "rows": [
        {
          "method": "UWM",
          "size_b": "0.4",
          "action_pretraining": "Yes",
          "demos_per_task": "1,000",
          "average": "60.8",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zheng2025flare"
          ],
          "source_emphasis": {}
        },
        {
          "method": "π0",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "demos_per_task": "300",
          "average": "62.5",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zhang2026devadecoupledvideoactionmodel"
          ],
          "source_emphasis": {}
        },
        {
          "method": "GR00T-N1.5",
          "size_b": "3.0",
          "action_pretraining": "Yes",
          "demos_per_task": "300",
          "average": "64.1",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zhang2026devadecoupledvideoactionmodel"
          ],
          "source_emphasis": {}
        },
        {
          "method": "GR00T-N1",
          "size_b": "2.2",
          "action_pretraining": "Yes",
          "demos_per_task": "50",
          "average": "36.0",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zhang2026dig"
          ],
          "source_emphasis": {}
        },
        {
          "method": "π0.5",
          "size_b": "3.3",
          "action_pretraining": "Yes",
          "demos_per_task": "50",
          "average": "41.4",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "zhang2026dig"
          ],
          "source_emphasis": {}
        },
        {
          "method": "UVA",
          "size_b": "0.5",
          "action_pretraining": "No",
          "demos_per_task": "50",
          "average": "50.0",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "liang2025videopolicy"
          ],
          "source_emphasis": {}
        },
        {
          "method": "Video Policy",
          "size_b": "2.43",
          "action_pretraining": "No",
          "demos_per_task": "50",
          "average": "63.0",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "liang2025videopolicy"
          ],
          "source_emphasis": {}
        },
        {
          "method": "Fast-WAM",
          "size_b": "6.0",
          "action_pretraining": "No",
          "demos_per_task": "50",
          "average": "49.5",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "huang2026foresight"
          ],
          "source_emphasis": {}
        },
        {
          "method": "ForeWAM",
          "size_b": "1.5",
          "action_pretraining": "No",
          "demos_per_task": "50",
          "average": "59.2",
          "is_ours": false,
          "group": null,
          "citation_keys": [
            "huang2026foresight"
          ],
          "source_emphasis": {}
        },
        {
          "method": "ThinkWAM",
          "size_b": "1.5",
          "action_pretraining": "No",
          "demos_per_task": "50",
          "average": "65.17",
          "is_ours": true,
          "group": null,
          "citation_keys": [],
          "source_emphasis": {
            "average": "bold"
          }
        }
      ],
      "notes": [
        "Comparison reproduced from the manuscript. Bold and underlined values retain its best and second-best annotations.",
        "Avg. is average success (%); Demos is the training demonstrations per task. Different training budgets remain explicit.",
        "ThinkWAM uses a nominal budget of 50 demonstrations per task, 24 tasks, and 50 evaluation rollouts per task.",
        "UWM uses its original pretrained model metadata and a 1,000-demonstration budget; π0 and GR00T-N1.5 use 300 demonstrations per task.",
        "P.T. is policy-level action pretraining. ForeWAM is marked No under this convention although its frozen LaWM teacher carries external embodied pretraining.",
        "Video Policy size 2.43B includes frozen text and VAE modules. Baseline values follow the source papers listed in the manuscript."
      ]
    }
  },
  "latency": {
    "title": "A100 inference latency",
    "columns": [
      {
        "key": "method",
        "label": "Method"
      },
      {
        "key": "libero_mean_ms",
        "label": "LIBERO",
        "unit": "ms",
        "direction": "lower"
      },
      {
        "key": "robotwin_mean_ms",
        "label": "RoboTwin 2.0",
        "unit": "ms",
        "direction": "lower"
      },
      {
        "key": "libero_chunk",
        "label": "LIBERO chunk"
      },
      {
        "key": "robotwin_chunk",
        "label": "RoboTwin chunk"
      }
    ],
    "rows": [
      {
        "method": "LaWAM",
        "libero_mean_ms": "222.73",
        "robotwin_mean_ms": "215.62",
        "citation_keys": [
          "lawam2026"
        ],
        "is_ours": false,
        "libero_chunk": "8 × 32 (7 native)",
        "robotwin_chunk": "36 × 32 (16 native EEF)",
        "integration": "10 steps"
      },
      {
        "method": "π0.5 (RLinf SFT)",
        "libero_mean_ms": "286.62",
        "robotwin_mean_ms": "254.59",
        "citation_keys": [
          "pi05",
          "rlinf2026repository"
        ],
        "is_ours": false,
        "libero_chunk": "50 × 7",
        "robotwin_chunk": "50 × 14 (32 padded)",
        "integration": "10 steps"
      },
      {
        "method": "OpenWAM-α",
        "libero_mean_ms": "413.97",
        "robotwin_mean_ms": "426.83",
        "citation_keys": [
          "wang2026openwam"
        ],
        "is_ours": false,
        "libero_chunk": "32 × 10 EEF",
        "robotwin_chunk": "32 × 20 EEF",
        "integration": "10 steps"
      },
      {
        "method": "FastWAM",
        "libero_mean_ms": "506.48",
        "robotwin_mean_ms": "496.16",
        "citation_keys": [
          "yuan2026fastwam"
        ],
        "is_ours": false,
        "libero_chunk": "32 × 7",
        "robotwin_chunk": "32 × 14",
        "integration": "10 steps"
      },
      {
        "method": "ThinkWAM",
        "libero_mean_ms": "153.48",
        "robotwin_mean_ms": "164.61",
        "citation_keys": [],
        "is_ours": true,
        "libero_chunk": "16 × 7",
        "robotwin_chunk": "32 × 14",
        "integration": "2 passes × 4 steps"
      }
    ],
    "notes": [
      "Mean latency per action chunk, measured on one A100 80GB with batch size 1, 10 warm-up calls, and 60 timed calls.",
      "Methods retain their native chunk shapes and integration settings. These are model-call timings; simulator rendering and initialization are excluded.",
      "Inputs use synthetic RGB/state with real task instructions. All timed samples are retained.",
      "Implementation and timing boundaries differ: ThinkWAM uses a compiled action core and CUDA Graph, while π0.5 uses PyTorch eager. ThinkWAM instruction encoding is outside the timed interval.",
      "The table reports means only. It does not report real-world robot control latency."
    ]
  },
  "mechanisms": [
    {
      "title": "Affordance-guided memory",
      "src": "assets/affordance_compact.png",
      "width": 2400,
      "height": 858,
      "caption": "LIBERO observations paired with predicted affordance-head scores on a shared 0–1 scale. Dashed boxes mark task objects; circles locate score maxima. These are affordance predictions, not task-success probabilities. These LIBERO examples use the affordance branch; the RoboTwin setting disables it."
    },
    {
      "title": "Action-conditioned latent correction",
      "src": "assets/action_latent_openloop_stacked.png",
      "width": 2400,
      "height": 1583,
      "caption": "Open-loop comparisons from identical simulator states and action histories, without replanning. Proposal actions are red and refined actions are teal. A shared frozen decoder visualizes base and corrected future latents at t+7, t+15, and t+31; the action and latent panels show separate examples. Decoded latents are predictions, not simulator outcomes of the illustrated action chunks."
    },
    {
      "title": "Multi-horizon token allocation",
      "src": "assets/horizon_token_allocation_75k.png",
      "width": 2400,
      "height": 1800,
      "caption": "Multi-horizon targets at t+7, t+15, and t+31 use 288, 144, and 72 query tokens. The top row contains recorded future observations; the middle row applies increasing blur to one crop to illustrate fine-to-coarse detail; the bottom row shows one cell per query token."
    },
    {
      "title": "LIBERO & LIBERO-Plus",
      "src": "assets/closed_loop_action_comparison.png",
      "width": 2400,
      "height": 912,
      "caption": "Selected LIBERO and LIBERO-Plus rollouts compare proposal actions (red) and refined actions (teal) from matched starts. Each branch replans from its own observations. Panels show scene trajectories, snapshots at refinement’s first success, horizontal end-effector paths, and height/gripper traces. Time excludes inference latency. These selected cases do not measure how often refinement recovers a failure.",
      "group": "Closed-loop Comparisons and Recoveries"
    },
    {
      "title": "RoboTwin 2.0",
      "src": "assets/robotwin_recoveries_compact.png",
      "width": 2400,
      "height": 731,
      "caption": "Four selected RoboTwin tasks compare proposal-only execution with refinement from matched starts: a toy car into a basket, a cup onto a coaster, striking a block with a hammer, and aligning a shoe. Each task shows an interaction and final outcome for both branches; circles identify the interaction region. These selected cases do not measure how often refinement recovers a failure.",
      "group": "Closed-loop Comparisons and Recoveries"
    }
  ],
  "huggingfaceUrl": "https://huggingface.co/Adrain11/ThinkWAM",
  "simulationVideoNote": "RoboTwin videos replay complete archived actions at 25 fps and are shown at 3× simulation speed. RoboCasa24 examples come from a fixed-scene adaptation run. These selected qualitative trajectories are separate from the benchmark aggregates; playback duration is not inference latency.",
  "realLatency": {
    "title": "Real-world inference latency on one RTX 4080 SUPER",
    "columns": [
      {
        "key": "method",
        "label": "Method"
      },
      {
        "key": "mean_ms",
        "label": "Mean latency",
        "unit": "ms",
        "direction": "lower"
      }
    ],
    "rows": [
      {
        "method": "ThinkWAM",
        "mean_ms": "101.2",
        "is_ours": true,
        "source_emphasis": {
          "mean_ms": "bold"
        }
      },
      {
        "method": "π0.5",
        "mean_ms": "112.6"
      },
      {
        "method": "FastWAM",
        "mean_ms": "119.8"
      }
    ],
    "hardware": "NVIDIA RTX 4080 SUPER"
  }
};
