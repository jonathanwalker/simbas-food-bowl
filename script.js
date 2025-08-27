// Three.js STL Viewer for Simbas Food Bowl
class STLViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.isWireframe = false;
        this.initialCameraPosition = { x: 0, y: 0, z: 5 };
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(
            this.initialCameraPosition.x,
            this.initialCameraPosition.y,
            this.initialCameraPosition.z
        );

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Setup lighting
        this.setupLighting();

        // Setup controls
        this.setupControls();

        // Load the STL model
        this.loadSTLModel();

        // Start animation loop
        this.animate();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun-like)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light for additional illumination
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-10, -10, -5);
        this.scene.add(pointLight);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 20;
        this.controls.maxPolarAngle = Math.PI;
        
        // Mobile-friendly settings
        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.enableRotate = true;
        
        // Smooth zoom
        this.controls.zoomSpeed = 0.8;
        this.controls.rotateSpeed = 0.8;
        this.controls.panSpeed = 0.8;
    }

    loadSTLModel() {
        const loader = new THREE.STLLoader();
        const stlPath = './simbas-food-bowl.stl';

        loader.load(
            stlPath,
            (geometry) => {
                // Create material
                const material = new THREE.MeshPhongMaterial({
                    color: 0x8B4513, // Saddle brown color for food bowl
                    specular: 0x111111,
                    shininess: 30,
                    transparent: true,
                    opacity: 0.9
                });

                // Create mesh
                this.model = new THREE.Mesh(geometry, material);
                
                // Center the model
                geometry.computeBoundingBox();
                const center = geometry.boundingBox.getCenter(new THREE.Vector3());
                this.model.position.sub(center);
                
                // Scale model to fit view
                const size = geometry.boundingBox.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                this.model.scale.setScalar(scale);
                
                // Add shadows
                this.model.castShadow = true;
                this.model.receiveShadow = true;
                
                this.scene.add(this.model);
                
                // Hide loading screen
                document.getElementById('loading').style.display = 'none';
                
                // Show info panel
                document.getElementById('info-panel').style.display = 'block';
                
                console.log('STL model loaded successfully');
            },
            (progress) => {
                const percentComplete = (progress.loaded / progress.total) * 100;
                console.log(`Loading progress: ${percentComplete.toFixed(2)}%`);
            },
            (error) => {
                console.error('Error loading STL file:', error);
                document.getElementById('loading').innerHTML = 
                    '<p style="color: #ff6b6b;">Error loading model. Please refresh the page.</p>';
            }
        );
    }

    setupEventListeners() {
        // Reset view button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetView();
        });

        // Wireframe toggle button
        document.getElementById('wireframe-btn').addEventListener('click', () => {
            this.toggleWireframe();
        });

        // Info button
        document.getElementById('info-btn').addEventListener('click', () => {
            this.toggleInfoPanel();
        });

        // Double tap to reset (mobile)
        let lastTap = 0;
        this.renderer.domElement.addEventListener('touchend', (event) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                this.resetView();
            }
            lastTap = currentTime;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.onWindowResize();
            }, 100);
        });
    }

    resetView() {
        if (this.controls) {
            this.camera.position.set(
                this.initialCameraPosition.x,
                this.initialCameraPosition.y,
                this.initialCameraPosition.z
            );
            this.controls.reset();
        }
    }

    toggleWireframe() {
        if (this.model) {
            this.isWireframe = !this.isWireframe;
            this.model.material.wireframe = this.isWireframe;
            
            const wireframeBtn = document.getElementById('wireframe-btn');
            wireframeBtn.textContent = this.isWireframe ? 'Solid' : 'Wireframe';
        }
    }

    toggleInfoPanel() {
        const infoPanel = document.getElementById('info-panel');
        const isVisible = infoPanel.style.display !== 'none';
        infoPanel.style.display = isVisible ? 'none' : 'block';
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new STLViewer();
});

// Handle touch events for better mobile experience
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        // Single touch - allow rotation
        e.preventDefault();
    }
}, { passive: false });

// Prevent context menu on long press
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
