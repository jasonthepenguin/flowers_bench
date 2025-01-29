// FlowersBenchLogo icon component
const FlowersBenchLogo = () => (
    <svg 
      viewBox="0 0 240 170" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24" // Increased from h-6 w-6 to h-12 w-12
      aria-hidden="true"
    >
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="
            0 0 0 0 1
            0 0 0 0 0.2
            0 0 0 0 0.6
            0 0 0 1 0
          " result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
  
      <g filter="url(#neonGlow)">
      <path fill="#FF69B4" d="M35.1808 128.597C35.6239 128.729 36.0414 128.95 36.4594 129.146C37.2947 130.121 36.7819 143.676 36.8039 145.987C39.3905 145.98 44.6784 145.285 46.92 146.576C47.2949 147.251 47.1299 147.563 47.0075 148.29C42.9655 148.855 38.8742 148.204 34.821 148.404C34.6414 143.333 34.1066 133.247 35.1808 128.597Z"/>
		<path fill="#FF69B4" d="M18.3376 128.826C21.7364 129.582 28.9412 128.433 31.4746 130.13L31.5494 130.581C31.4734 130.683 31.4808 130.678 31.3801 130.783C30.1464 132.064 22.6584 131.551 20.5936 131.594C21.0242 133.59 20.8744 135.427 20.6863 137.436C23.4326 137.115 26.1544 137.28 28.7907 138.135L28.6499 138.941C27.5461 139.831 22.4918 139.354 20.8138 139.535C21.0737 142.145 21.0772 145.258 20.5809 147.83C20.1631 148.349 20.0592 148.496 19.4294 148.713L18.998 148.413C17.4947 145.713 18.2547 132.702 18.3376 128.826Z"/>
		<path fill="#FF69B4" d="M198.334 129.374C200.277 129.066 202.268 129.137 204.037 130.064C205.135 130.64 206.487 131.791 206.825 133.031C206.958 133.521 206.939 133.701 206.682 134.129C205.193 134.51 203.542 132.258 202.318 131.635C201.662 131.3 200.755 131.192 200.031 131.057C199.477 131.623 198.23 131.659 197.526 132.122C194.713 133.973 196.674 140.788 196.067 143.664C196.056 143.717 196.044 143.769 196.032 143.822C197.332 144.524 198.213 145.796 199.708 146.271C200.515 146.528 201.184 146.507 201.935 146.126C203.157 145.777 203.917 144.859 204.999 144.272C205.524 143.987 206.275 143.619 206.868 143.797L206.947 144.258C206.393 145.869 205.262 147.124 203.771 147.919C202.139 148.788 199.861 148.844 198.102 148.291C196.488 147.783 195.195 146.584 194.43 145.088C193.009 142.307 193.062 136.891 194.043 133.971C194.842 131.592 196.138 130.481 198.334 129.374Z"/>
		<path fill="#FF69B4" d="M137.096 146.005C136.256 146.823 135.457 147.456 134.361 147.9C132.275 148.745 129.953 148.779 127.876 147.88C126.798 147.414 125.281 146.416 124.865 145.269C124.669 144.729 124.744 144.514 124.962 144.017C127.121 142.678 127.127 145.936 129.959 146.284C131.461 146.468 133.474 146.224 134.666 145.23C135.393 144.624 135.78 143.863 135.862 142.92C136.227 138.723 128.298 140.488 125.938 137.559C125.04 136.445 124.884 134.957 125.019 133.58C125.136 132.393 125.54 131.411 126.496 130.652C127.941 129.505 130.044 128.917 131.872 129.113C134.42 129.385 136.03 130.572 137.591 132.509C137.88 132.957 137.965 133.277 138.026 133.802L137.726 134.137C136.496 134.307 134.078 132.296 132.805 131.784C131.337 131.193 129.905 131.506 128.495 132.105C127.638 132.964 127.013 133.701 127.04 135C127.053 135.631 127.337 136.116 127.797 136.533C128.229 136.926 128.74 137.091 129.291 137.247C129.313 137.256 129.336 137.266 129.358 137.276C131.939 138.352 136.731 137.471 138.059 140.783C138.61 142.159 138.137 143.828 137.55 145.114Q137.341 145.569 137.096 146.005Z"/>
		<path fill="#FF69B4" d="M212.834 139.512C213.526 140.935 213.238 145.606 212.872 147.176C212.696 147.928 212.442 148.239 211.815 148.63C211.566 148.538 211.458 148.554 211.341 148.3C210.282 146.006 210.607 130.832 211.499 128.483L212.189 128.45C213.373 130.463 213.336 135.241 212.791 137.485L212.77 137.571C215.671 137.701 218.573 137.612 221.474 137.773C222.456 136.442 221.061 130.644 222.554 128.764C223.076 128.737 223.142 128.867 223.533 129.183C224.323 130.828 224.464 144.82 223.793 147.002C223.967 147.646 224.068 147.796 223.836 148.441C223.29 148.703 222.812 148.71 222.214 148.72C220.502 146.83 222.182 141.987 221.561 139.674C218.75 139.308 215.677 139.528 212.834 139.512Z"/>
		<path fill="#FF69B4" d="M92.1327 128.804C94.6327 129.226 103.284 128.934 104.674 129.701C104.836 129.79 104.867 130.072 104.922 130.246C103.4 133.242 96.2939 130.604 94.2462 131.593C93.9943 131.715 93.9444 131.778 93.8401 132.034C93.8065 132.117 94.0023 137.235 94.0822 137.424C96.0338 137.525 99.2395 137.318 101.015 137.933C101.478 138.093 101.54 138.21 101.76 138.638L101.568 139.105C99.5675 140.306 96.2424 139.255 93.9844 139.584L93.8703 139.601C94.2568 141.6 94.0296 144.078 93.7884 146.09C96.3883 145.919 102.413 145.262 104.429 146.879C104.4 147.096 104.429 147.245 104.259 147.399C102.761 148.749 94.029 148.328 91.7811 148.241C91.4664 144.916 91.7003 141.392 91.6838 138.045C91.6708 135.398 91.3777 132.482 91.6951 129.869C91.7441 129.465 91.895 129.13 92.1327 128.804Z"/>
		<path fill="#FF69B4" d="M159.576 128.929C162.122 129.369 170.871 128.688 172.289 130.031L172.293 130.802C170.273 133.155 164.485 130.265 162.175 131.952C161.701 133.5 161.987 135.637 161.907 137.296C163.918 137.165 167.572 136.732 169.25 137.922C169.497 138.424 169.535 138.474 169.391 139.046C167.798 140.193 164.119 139.409 162.148 139.571L162.08 139.977C162.062 141.956 162.019 143.913 161.855 145.887C163.794 146.014 170.619 145.59 171.865 146.47C172.219 147.015 172.481 147.224 172.428 147.883C171.035 148.574 161.652 148.423 159.551 148.503C159.254 142.076 159.268 135.353 159.576 128.929Z"/>
		<path fill="#FF69B4" d="M187.228 128.872C187.71 128.798 188.157 128.803 188.642 128.82C189.136 129.16 189.372 129.292 189.503 129.915C189.749 131.089 189.468 132.728 189.469 133.957L189.565 144.179C189.575 145.517 189.799 146.813 189.726 148.159C189.716 148.351 189.471 148.659 189.364 148.832C186.2 149.508 180.616 135.817 177.448 134.063C177.422 134.048 177.395 134.034 177.369 134.02C177.562 134.391 177.756 134.779 177.875 135.181C178.111 135.986 178.371 146.668 178.206 147.481C178.166 147.682 177.885 148.048 177.776 148.242C177.402 148.659 176.884 148.684 176.366 148.719C175.962 148.499 175.691 148.382 175.58 147.903C175.463 147.394 175.728 131.522 175.78 130.438C175.801 130.013 175.865 129.694 176.093 129.331L176.592 129.225C177.4 129.414 177.931 129.904 178.458 130.517C180.314 132.673 181.576 135.578 183.114 137.982C184.072 139.48 185.302 140.779 186.136 142.361C186.394 142.851 186.527 143.272 186.487 143.834C188.102 140.407 185.873 132.541 187.228 128.872Z"/>
		<path fill="#FF69B4" d="M76.9349 128.554C79.9649 129.97 80.0237 140.461 82.0605 142.684L82.439 142.519C83.0726 138.443 83.9314 134.044 85.2005 130.118C85.3853 129.546 85.4491 129.031 86.0006 128.754C86.6892 128.825 86.8131 128.79 87.2934 129.288C87.6309 130.459 84.2597 145.397 83.4376 147.347C83.2128 147.881 82.97 148.543 82.4006 148.776C80.4501 147.71 78.4243 136.996 77.4307 134.182C75.5695 135.972 74.7803 146.355 72.6369 148.602C72.3171 148.938 72.2152 148.926 71.7638 148.94C71.1032 148.343 70.8409 147.508 70.5966 146.676C69.8414 144.108 69.6183 141.376 69.045 138.76C68.4534 136.06 67.1358 132.902 67.0431 130.17C67.0204 129.5 67.0737 129.238 67.5289 128.756C67.7544 128.782 67.9864 128.823 68.1913 128.926C68.6656 129.165 69.092 129.648 69.2975 130.134C69.6567 130.983 69.6585 132.018 69.863 132.915C70.6646 136.431 71.4665 140.027 72.4383 143.502C72.9986 138.723 74.7245 132.813 76.9349 128.554Z"/>
		<path fill="#FF69B4" d="M107.785 128.907C110.891 129.435 114.441 128.748 117.382 129.752C119.692 130.541 120.716 132.103 121.756 134.203C121.26 135.247 120.155 138.202 119.108 138.745C118.441 139.091 117.727 139.191 117.055 139.59C116.209 141.665 121.679 145.313 121.311 148.116C121.105 148.299 120.962 148.532 120.671 148.503C119.734 148.409 118.881 147.172 118.334 146.488C117.131 144.816 116.414 142.694 115.037 141.17C113.579 139.557 112.166 139.537 110.141 139.419C110.206 141.118 110.742 147.194 109.78 148.305C109.585 148.369 109.352 148.447 109.142 148.438C108.551 148.413 108.267 148.233 107.868 147.832C107.629 144.692 107.08 131.211 107.785 128.907ZM109.803 131.463C110.061 133.596 109.94 135.597 109.615 137.715C112.179 137.577 115.415 138.724 117.583 137.085C118.334 136.248 119.092 135.416 119.013 134.201C118.975 133.626 118.689 133.121 118.242 132.764C116.162 131.099 112.291 131.668 109.803 131.463Z"/>
		<path fill="#FF69B4" d="M142.018 129.658C142.787 128.903 145.756 129.227 146.919 129.239C149.311 129.262 152.292 129.473 154.07 131.316C154.751 132.022 155.038 132.884 155.014 133.858C154.964 135.841 152.767 138.55 152.773 138.615C152.78 138.701 153.053 139.011 153.127 139.089C153.819 139.814 154.581 140.191 155.219 141.039L155.421 144.428C154.31 146.347 153.519 147.429 151.315 148.021C148.625 148.742 145.152 148.569 142.383 148.352Q142.246 145.482 142.208 142.608C142.355 141.282 142.061 139.588 142.021 138.229Q141.894 133.944 142.018 129.658ZM144.042 139.508C144.733 141.738 144.32 143.749 144.362 146.023C146.708 146.032 150.569 146.593 152.474 145.098C153.15 144.15 153.678 143.389 153.457 142.157C153.338 141.495 152.967 141.014 152.416 140.641C149.948 138.971 146.768 139.966 144.042 139.508ZM144.17 131.467C144.498 133.448 144.35 135.412 144.171 137.402C146.674 137.296 149.205 138.262 151.504 136.896C152.182 136.217 152.915 135.05 152.9 134.047C152.892 133.548 152.626 133.046 152.256 132.722C150.329 131.036 146.541 131.609 144.17 131.467Z"/>
		<path fill="#FF69B4" d="M54.246 129.289C55.3608 129.236 56.5012 129.16 57.6083 129.339C60.1382 129.746 61.7311 131.152 63.198 133.16C63.3646 136.251 63.9612 142.449 62.5646 145.125C61.5154 147.136 59.8773 147.718 57.8204 148.368C56.7095 148.565 55.722 148.545 54.6114 148.34C52.9491 148.034 51.6224 147.213 50.6659 145.807C48.4408 142.539 49.0167 136.607 49.7376 132.872C51.161 131.201 52.2354 130.191 54.246 129.289ZM56.4431 131.32C54.4622 131.666 53.5612 132.143 52.1144 133.539C51.7713 136.478 50.8352 142.421 52.7928 144.831C53.6292 145.86 55.0031 146.203 56.2683 146.31Q56.5296 146.333 56.7915 146.347C58.3313 145.848 59.5164 145.479 60.3149 143.94C61.6385 141.388 61.116 137.337 61.4527 134.46C60.3394 133.064 59.3431 131.598 57.4247 131.38C57.1035 131.343 56.7656 131.306 56.4431 131.32Z"/>
		<path fill="#FF69B4" d="M118.43 13.8195C124.606 13.2964 130.255 15.7569 134.989 19.5684C137.316 19.4815 139.747 19.1408 142.063 19.2398C148.163 19.5007 153.76 21.9312 157.897 26.4529C163.455 32.5275 164.081 38.9647 163.709 46.7988C168.905 52.3649 171.961 57.2677 171.983 65.1515C172.005 72.9379 169.455 77.9464 164.042 83.387C164.027 85.554 163.992 87.7132 163.679 89.8621C162.725 96.4069 159.716 102.973 154.292 106.984C148.492 111.274 141.711 112.216 134.755 111.17C130.5 114.795 126.436 116.723 120.883 117.289C114.338 117.308 109.369 114.786 104.271 110.929C101.461 111.582 98.5937 111.577 95.7371 111.254C89.5652 110.556 84.2467 107.717 80.3769 102.83C76.1333 97.4707 74.7039 91.2936 75.4807 84.5921Q75.0049 84.1437 74.5513 83.6729Q74.0977 83.202 73.6672 82.71Q73.2368 82.2179 72.8305 81.7056Q72.4242 81.1934 72.0431 80.6622Q71.6619 80.131 71.3068 79.5821Q70.9516 79.0332 70.6233 78.4678Q70.2949 77.9024 69.9942 77.3219Q69.6934 76.7414 69.421 76.1471Q69.1485 75.5528 68.905 74.9461Q68.6614 74.3393 68.4473 73.7216Q68.2332 73.1038 68.0491 72.4765Q67.865 71.8492 67.7113 71.2137Q67.5576 70.5782 67.4347 69.9361Q67.3117 69.294 67.2198 68.6467Q67.1279 67.9994 67.0672 67.3484Q67.0066 66.6974 66.9773 66.0443C66.6882 58.0286 70.0409 52.065 75.2962 46.4042C75.0136 44.148 75.1393 41.8447 75.4091 39.5913C76.1636 33.2896 79.6653 28.1173 84.5987 24.2712C90.4376 19.7192 97.4193 18.8022 104.561 19.7109C108.92 16.4182 113.051 14.7295 118.43 13.8195ZM103.338 47.5053C105.623 52.5183 109.489 58.9858 114.287 61.7717C114.119 62.6621 114.039 63.7501 113.482 64.4872C112.908 64.8417 112.146 64.8036 111.508 64.6488C110.417 64.3844 109.369 63.8741 108.256 63.709C104.736 63.1869 99.3439 64.7743 95.7603 65.3485C101.926 66.4817 107.012 67.1691 113.242 66.054C113.703 67.2716 114.188 68.4864 114.585 69.7264C109.052 72.2965 106.258 77.8207 103.164 82.8589C107.346 79.9304 113.855 76.245 114.805 70.9106L114.824 70.8053C116.351 71.2973 117.896 71.7589 119.41 72.2885C117.259 75.5648 117.587 79.1258 118.356 82.8394Q118.938 85.5418 119.569 88.2329C120.01 86.1601 120.588 84.0334 120.877 81.9384C121.166 80.4409 121.435 78.8554 121.513 77.3298C121.586 75.9125 121.556 74.8104 120.559 73.7193L120.327 72.6055C120.69 72.0518 122.187 71.7203 122.831 71.589C123.166 71.5205 123.512 71.4909 123.854 71.485C125.365 72.8492 126.277 74.7162 127.742 76.0801C130.197 78.3647 133.222 80.1078 135.764 82.3543C133.812 78.9827 131.5 75.2445 128.957 72.2896C127.997 71.1739 125.007 71.2641 125.456 69.5329C125.751 68.3974 126.439 66.8259 127.12 65.8766C127.488 65.967 127.838 66.0435 128.155 66.2604C130.333 67.75 141.251 66.0525 143.905 65.5703C140.029 64.1687 132.789 62.5799 128.955 64.3916Q128.083 64.814 127.238 65.2898L125.648 62.3591C130.102 57.6283 133.174 52.8348 136.341 47.1756C133.284 49.7133 129.949 51.9332 127.252 54.8738C125.783 56.4753 124.75 58.4021 123.304 59.9711C122.416 59.6732 121.318 59.4421 120.676 58.7259C120.465 58.1049 120.367 57.6674 120.684 57.0391C120.936 56.5373 121.273 56.082 121.558 55.5992C121.325 51.9469 120.614 48.8536 119.561 45.351C118.818 47.9964 117.501 51.9286 117.875 54.6548C118.122 56.4542 119.738 58.3079 118.151 59.8921C117.607 60.1139 117.194 60.0813 116.649 59.8648C114.548 59.0302 113.26 55.7779 111.611 54.1633C109.116 51.7207 106.024 49.7513 103.338 47.5053ZM91.8592 66.9542C84.1285 71.3267 81.2678 74.3759 78.4973 82.9277C83.4795 85.5701 89.4649 87.0936 95.0659 85.6773C96.7035 85.3125 98.2241 84.9262 99.7559 84.2157C101.952 80.1587 104.154 76.1656 106.822 72.3913C107.169 71.9004 108.991 69.8672 108.959 69.5782C107.702 69.4126 106.386 69.6129 105.11 69.5333C100.597 69.2517 96.0887 68.5733 91.8592 66.9542ZM146.16 44.0717C144.105 44.3851 142.019 44.7779 140.093 45.5892C137.208 51.1503 134.66 56.899 130.225 61.4533C134.082 60.4573 141.352 61.8733 145.349 62.8382L147.686 63.4832C153.502 60.4834 157.669 56.3342 159.687 50.0147C159.897 49.3557 160.116 48.6936 160.297 48.0261C156.361 45.4007 151.02 43.2221 146.16 44.0717ZM90.6883 44.0871C86.2378 44.7989 82.4812 44.9879 78.8718 48.0143C80.4145 53.8195 83.4193 58.6975 88.7281 61.7796C89.9026 62.4615 91.0766 62.9214 92.3753 63.3066L96.9419 62.0948C100.664 61.0304 105.722 60.5287 109.512 61.2623C106.323 58.56 103.748 54.6087 101.667 51.0065C100.617 49.1907 99.6982 47.2515 98.3401 45.6416C97.4535 44.5907 95.4738 44.401 94.1851 44.3031C93.0207 44.2146 91.8534 44.168 90.6883 44.0871ZM146.393 67.544C142.897 68.4155 135.138 70.3437 131.787 69.5452C131.507 69.4784 131.216 69.4434 130.932 69.3959L130.642 69.626C131.277 70.7684 132.3 71.5855 133.055 72.6481C135.506 76.0988 137.943 80.053 139.311 84.0829C141.14 84.8497 142.964 85.5092 144.94 85.7649C149.002 86.2878 154.9 86.1525 158.349 83.5546C158.889 83.1479 159.402 82.5771 159.502 81.8849C159.858 79.4266 157.179 75.5921 155.751 73.7704C154.134 71.707 150.431 67.7875 147.683 67.465C147.26 67.4153 146.801 67.4091 146.393 67.544ZM133.084 23.486C128.434 25.5256 123.663 28.4866 121.742 33.4486C119.811 38.4362 122.195 43.2003 123.233 48.0502C123.662 50.0551 123.752 52.145 123.931 54.1844L124.238 54.2481C124.64 53.8762 125.02 53.5245 125.341 53.0767C127.547 50.7918 130.117 48.7622 132.69 46.9058C134.198 45.8177 135.945 44.8011 137.256 43.4818C138.8 38.1095 138.543 31.0271 135.801 26.0465C135.31 25.1556 134.342 23.8056 133.352 23.5285C133.171 23.4778 133.249 23.4889 133.084 23.486ZM114.878 76.6842C111.925 80.131 106.152 84.4512 102.196 86.7343C100.132 91.5157 100.125 96.3296 102.057 101.175C102.825 103.1 103.837 104.879 104.942 106.627C106.219 107.162 107.231 106.767 108.475 106.261C112.662 104.557 116.164 100.976 118.429 97.1314C117.529 92.1619 116.521 87.1898 115.708 82.2071C115.5 80.9303 115.428 78.0331 115.145 77.0413C115.119 76.9527 114.94 76.7674 114.878 76.6842ZM106.02 23.4144C102.272 27.4288 100.592 33.6328 100.797 39.0595C100.877 41.176 101.451 42.8808 103.039 44.3347C106.41 47.4215 110.877 49.279 113.851 52.9145C114.214 53.3191 114.632 53.9209 115.171 54.0498C115.377 52.1505 115.499 50.1341 115.972 48.2824C116.541 46.0581 117.484 43.8475 117.832 41.5776C118.266 38.7548 117.875 35.8076 118.065 32.964C114.896 28.3601 110.919 25.824 106.02 23.4144ZM123.989 76.3534C124.728 80.6943 122.15 89.2906 120.85 93.746C122.397 98.821 124.786 102.78 129.632 105.36C130.926 106.05 132.426 106.348 133.641 107.153C133.835 107.046 134.047 106.963 134.185 106.788C137.199 102.071 139.213 95.4123 137.988 89.7749C137.799 88.9067 137.504 88.0498 137.185 87.2216C134.412 85.076 131.533 83.0865 128.895 80.7709C128.132 80.1014 124.615 76.4895 123.989 76.3534ZM77.8058 86.1466C78.0146 87.6801 77.9716 89.2311 78.2071 90.7455C79.0757 96.331 82.0237 101.027 86.5145 104.446Q87.126 104.906 87.7717 105.318Q88.4174 105.729 89.0932 106.088Q89.769 106.448 90.4709 106.753Q91.1728 107.059 91.8964 107.308Q92.62 107.558 93.3609 107.75Q94.1018 107.943 94.8554 108.076Q95.6091 108.21 96.3709 108.285Q97.1328 108.359 97.8981 108.374C99.3606 108.407 100.799 108.222 102.254 108.394L102.531 108.068Q102.174 107.607 101.84 107.128Q101.506 106.65 101.196 106.156Q100.886 105.662 100.601 105.153Q100.315 104.644 100.055 104.122Q99.795 103.6 99.5608 103.065Q99.3266 102.531 99.1188 101.986Q98.9111 101.441 98.7303 100.886Q98.5496 100.332 98.3962 99.7687Q98.2429 99.2059 98.1173 98.6362Q97.9918 98.0665 97.8943 97.4913Q97.7968 96.9161 97.7277 96.3369Q97.6586 95.7576 97.6179 95.1757Q97.5773 94.5937 97.5652 94.0105Q97.5531 93.4272 97.5697 92.8441Q97.5863 92.261 97.6314 91.6793Q97.6765 91.0977 97.7501 90.519C97.8423 89.8107 97.9314 89.0958 98.0693 88.395C92.1556 90.5016 84.8368 89.4888 79.2238 86.8121C78.752 86.5871 78.2819 86.3628 77.8058 86.1466ZM139.898 22.3229L137.396 22.8538L137.393 23.3438L137.457 23.4083C140.511 26.5237 141.809 33.4531 141.734 37.5987C141.706 39.1356 141.43 40.6069 140.878 42.0424C146.586 40.1435 153.24 40.9649 158.658 43.4896C159.457 43.9386 160.271 44.3731 161.049 44.8588C160.783 42.851 160.887 40.8602 160.665 38.8627Q160.563 37.9665 160.372 37.0849Q160.182 36.2033 159.904 35.3453Q159.626 34.4872 159.263 33.6612Q158.901 32.8351 158.458 32.0495Q158.015 31.2638 157.496 30.5263Q156.976 29.7888 156.386 29.1069Q155.795 28.425 155.14 27.8056Q154.484 27.1861 153.77 26.6352C150.035 23.7923 144.836 21.6963 140.049 22.2936C139.998 22.2999 139.949 22.3131 139.898 22.3229ZM98.412 22.3718C92.0348 22.8498 87.043 24.9576 82.8216 29.8804C79.2638 34.0293 78.2249 38.7795 78.3592 44.1121C79.4557 43.631 80.6633 42.9558 81.8157 42.6613C87.3256 40.6689 92.1128 40.9236 97.796 41.5756C98.0649 40.1971 97.4712 38.4993 97.4577 37.0702C97.4147 32.5047 99.5915 25.9788 102.526 22.5666C101.548 22.5731 99.1611 22.0903 98.412 22.3718ZM160.045 86.2559C155.902 88.2375 150.868 90.0559 146.224 89.4713C144.573 89.2635 142.982 88.6053 141.345 88.41C141.464 90.239 141.775 92.1871 141.716 94.007C141.603 97.484 140.051 104.9 137.749 107.466Q137.681 107.541 137.61 107.614L137.707 108.098C140.537 109.144 146.765 107.395 149.366 106.215C153.615 104.286 157.507 100.152 159.136 95.7733C160.182 92.9591 160.535 89.4994 160.498 86.5068C160.324 86.354 160.281 86.2719 160.045 86.2559ZM76.1344 50.1617C71.8864 54.5236 69.9748 59.9256 70.0547 65.9939C70.1462 72.9425 72.4637 75.86 76.3834 81.0721C76.7538 79.2903 77.191 77.8118 78.0151 76.1949C80.662 71.2995 83.4331 68.2777 88.2348 65.3767C83.2003 62.2843 78.2759 57.3685 76.8644 51.448Q76.743 50.9348 76.6417 50.4173L76.1344 50.1617ZM162.945 50.0792C161.281 55.9249 157.45 61.631 152.065 64.6068C151.54 64.897 150.981 65.1453 150.433 65.3891C155.076 67.6017 158.931 71.1278 161.072 75.9016C161.761 77.2351 162.371 78.5532 162.896 79.9597C165.034 78.7971 167.143 73.6827 167.815 71.4055C169.461 65.8307 169.15 59.6362 166.316 54.5027C165.524 53.0674 164.294 51.0453 162.945 50.0792ZM119.899 100.643C116.594 104.899 112.649 108.339 107.265 109.565C111.628 112.146 113.88 113.751 119.112 114.097C123.795 113.97 127.541 112.786 131.35 110.008C127.584 108.709 124.537 105.82 121.931 102.918C121.335 102.255 120.608 101.114 119.899 100.643ZM117.737 17.0809C113.659 17.7202 111.432 19.2642 107.783 20.9292C110.663 21.7412 113.915 23.8817 116.168 25.8431C117.043 26.6054 119.248 29.5624 120.147 29.6233C120.542 29.2309 120.883 28.8382 121.212 28.3893C122.926 26.3761 127.905 21.4068 130.422 21.2066Q130.626 21.1896 130.831 21.1818L130.939 20.8007C129.773 19.1819 125.667 17.4297 123.658 17.1111C121.764 16.8107 119.645 16.837 117.737 17.0809Z"/>
		<path fill="#FF69B4" d="M120.559 73.7193C121.556 74.8104 121.586 75.9125 121.513 77.3298C121.435 78.8554 121.166 80.4409 120.877 81.9384L120.491 81.6281L119.675 81.7924C119.575 81.6861 119.501 81.6178 119.455 81.4754C118.983 80.0114 118.73 75.7248 119.391 74.4287C119.657 73.9072 120.039 73.8915 120.559 73.7193Z"/>
      </g>
    </svg>
  )
  
  export default FlowersBenchLogo